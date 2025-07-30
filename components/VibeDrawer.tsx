'use client';

import { motion, AnimatePresence } from 'framer-motion';
import VibeCollection from './VibeCollection';

export default function VibeDrawer({ open, onClose, posts }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] rounded-t-xl border-t border-gray-700 p-4 shadow-xl max-h-[80%] overflow-auto"
          >
            <h2 className="text-lg font-semibold mb-4">Вайбы сторонки</h2>
            <VibeCollection posts={posts} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
