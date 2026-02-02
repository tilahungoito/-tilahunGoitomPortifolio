import { NextResponse } from 'next/server';
import knowledge from '@/data/knowledge.json';

const API_KEY = process.env.GEMINI_API_KEY?.trim();

// Priority list of models to try if the previous one fails or is rate-limited
const MODELS = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-flash-latest',
    'gemini-flash-lite-latest'
];

interface ChatMessage {
    id?: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp?: string | Date;
}

export async function POST(req: Request) {
    try {
        const { messages }: { messages: ChatMessage[] } = await req.json();

        if (!API_KEY) {
            console.warn('[AI Bot] GEMINI_API_KEY is missing!');
            return NextResponse.json({ error: 'API_KEY_MISSING' }, { status: 500 });
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

        const contents = messages.map((m: ChatMessage) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const payload = {
            system_instruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: contents
        };

        let lastError = null;

        // Multi-model fallback loop
        for (const modelName of MODELS) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

                console.log(`[AI Bot] Trying model: ${modelName}`);

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    signal: AbortSignal.timeout(8000) // 8s per attempt
                });

                if (response.ok) {
                    const data = await response.json();
                    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

                    if (aiText) {
                        console.log(`[AI Bot] Success with model: ${modelName}`);
                        return NextResponse.json({ text: aiText, modelUsed: modelName });
                    }
                }

                const errorBody = await response.text();
                console.warn(`[AI Bot] Model ${modelName} failed (${response.status}):`, errorBody);

                if (response.status === 429) {
                    lastError = 'RATE_LIMIT_REACHED';
                    continue; // Try next model
                }

                // For other errors, we might still want to try the next model just in case
                lastError = 'API_ERROR';
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                console.error(`[AI Bot] Request to ${modelName} failed:`, errorMessage);
                lastError = 'FETCH_FAILED';
            }
        }

        // If we're here, all models failed
        return NextResponse.json({ error: lastError || 'ALL_MODELS_FAILED' }, { status: 503 });

    } catch (error) {
        console.error('Chat API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'INTERNAL_ERROR';
        return NextResponse.json({ error: 'INTERNAL_ERROR', message: errorMessage }, { status: 500 });
    }
}
