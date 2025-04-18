'use client';

import { FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DownloadCV = () => {
  const handleDownload = () => {
    window.open('/tilahunGoitom.png', '_blank');
  };

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={handleDownload}
        className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
      >
        <FiDownload size={24} />
        <span className="hidden sm:inline">Download CV</span>
      </button>
      
      {/* Mobile Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-dark text-white px-3 py-1 rounded text-sm whitespace-nowrap sm:hidden">
        Download CV
      </div>
      
      {/* Desktop Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-dark text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
        Download CV
      </div>
    </motion.div>
  );
};

export default DownloadCV; 