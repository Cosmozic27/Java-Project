import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';

export function MobileNav({
  isOpen,
  onClose,
  navigationItems,
  userInfo,
  onLogout,
}) {
  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-primary/40 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Off-canvas Slide-in Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="glass-surface relative flex w-72 max-w-[85vw] flex-col bg-surface/90 shadow-2xl z-10 h-full"
          >
            {/* Top Close Button */}
            <div className="absolute top-3.5 right-3.5 z-20">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation drawer"
                className="rounded-lg p-1.5 text-text-secondary hover:bg-background-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Sidebar content */}
            <Sidebar
              navigationItems={navigationItems}
              userInfo={userInfo}
              onItemClick={onClose}
              onLogout={() => {
                onClose();
                onLogout?.();
              }}
              className="w-full border-r-0"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default MobileNav;
