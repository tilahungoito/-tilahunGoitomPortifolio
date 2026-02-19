import { NextResponse } from 'next/server';
import knowledge from '@/data/knowledge.json';

const GROQ_API_KEY = process.env.GROQ_API_KEY?.trim();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();

interface ChatMessage {
    id?: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp?: string | Date;
}

const systemPrompt = `You are Tilahun Goitom, a Software Engineer. Speak in the first person ("I", "me", "my"). 
Bio: ${knowledge.persona.role}, ${knowledge.persona.education}. 
Experience: ${knowledge.persona.experience}.
Projects: ${JSON.stringify(knowledge.projects)}
Contact: ${JSON.stringify(knowledge.persona.contact)}

RESPONSE FORMATTING RULES:
1. Use "### Section Name" for any new section or topic.
2. Use "- Point" for lists.
3. Use "**Text**" to highlight important keywords or technologies.
4. Keep paragraphs short and use line breaks between sections.
5. Always bridge non-tech questions (like "I am a farmer") back to your software expertise.
6. Be friendly, professional, and concise.`;

// ─── GROQ (Primary — Free, fast Llama 3) ─────────────────────────────────────
async function tryGroq(messages: ChatMessage[]): Promise<string | null> {
    if (!GROQ_API_KEY) return null;

    const groqMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
        })),
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile', // free, fast, very capable
            messages: groqMessages,
            max_tokens: 1024,
            temperature: 0.7,
        }),
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
        const err = await response.text();
        console.warn(`[AI Bot] Groq failed (${response.status}):`, err);
        return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? null;
}

// ─── GEMINI (Fallback — free tier, may hit daily quota) ───────────────────────
const GEMINI_MODELS = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-flash-lite-latest'];

async function tryGemini(messages: ChatMessage[]): Promise<string | null> {
    if (!GEMINI_API_KEY) return null;

    const contents = messages.map((m: ChatMessage) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
    }));

    const payload = {
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
    };

    for (const modelName of GEMINI_MODELS) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
            console.log(`[AI Bot] Trying Gemini model: ${modelName}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(8000),
            });

            if (response.ok) {
                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    console.log(`[AI Bot] Gemini success: ${modelName}`);
                    return text;
                }
            }

            const errorBody = await response.text();
            console.warn(`[AI Bot] Gemini ${modelName} failed (${response.status}):`, errorBody);

            if (response.status !== 429) break; // Only retry on rate limit
        } catch (err) {
            console.error(`[AI Bot] Gemini ${modelName} error:`, err instanceof Error ? err.message : err);
        }
    }

    return null;
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const { messages }: { messages: ChatMessage[] } = await req.json();

        if (!GROQ_API_KEY && !GEMINI_API_KEY) {
            return NextResponse.json({ error: 'No API keys configured. Add GROQ_API_KEY to .env.local' }, { status: 500 });
        }

        // Try Groq first (free & fast)
        if (GROQ_API_KEY) {
            console.log('[AI Bot] Trying Groq (primary)...');
            const groqResult = await tryGroq(messages);
            if (groqResult) {
                return NextResponse.json({ text: groqResult, modelUsed: 'groq/llama-3.3-70b' });
            }
            console.warn('[AI Bot] Groq failed, falling back to Gemini...');
        }

        // Fallback to Gemini
        if (GEMINI_API_KEY) {
            const geminiResult = await tryGemini(messages);
            if (geminiResult) {
                return NextResponse.json({ text: geminiResult, modelUsed: 'gemini' });
            }
        }

        return NextResponse.json(
            { error: 'All AI providers failed. Groq may be down, Gemini quota may be exhausted.' },
            { status: 503 }
        );
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'INTERNAL_ERROR', message: error instanceof Error ? error.message : 'Unknown' },
            { status: 500 }
        );
    }
}
