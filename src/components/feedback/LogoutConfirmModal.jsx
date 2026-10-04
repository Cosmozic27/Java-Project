import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';

/**
 * LogoutConfirmModal — shown when an authenticated user clicks the FoodBridge
 * logo from inside a portal. Requires confirmation before logging out.
 *
 * Props:
 *   isOpen   boolean  — controls visibility
 *   onStay   () => void — close modal, keep session
 *   onLogout () => void — call existing logout mechanism
 */
export function LogoutConfirmModal({ isOpen, onStay, onLogout, isDark = false }) {
  // Escape key support
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onStay();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onStay]);

  // Prevent background scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isDark ? 'portal-theme-dark' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-confirm-title"
          aria-describedby="logout-confirm-desc"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onStay}
            className={`fixed inset-0 backdrop-blur-xs ${isDark ? 'bg-black/70' : 'bg-text-primary/40'}`}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="logout-confirm-card relative w-full max-w-sm rounded-2xl border border-border bg-surface shadow-xl z-10 overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onStay}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-lg p-1.5 text-text-secondary hover:bg-background-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="px-6 pt-8 pb-6 text-center">
              {/* Brand mark */}
              <div className="flex justify-center mb-5">
                <Logo size="md" to={null} />
              </div>

              <h2
                id="logout-confirm-title"
                className="text-lg font-bold tracking-tight text-text-primary mb-2"
              >
                Leave FoodBridge?
              </h2>
              <p
                id="logout-confirm-desc"
                className="text-sm text-text-secondary leading-relaxed mb-7"
              >
                You're currently signed in. Do you want to log out and return to the FoodBridge landing page?
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={onStay}
                  id="logout-confirm-stay-btn"
                >
                  Stay Logged In
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  leftIcon={<LogOut className="h-4 w-4" />}
                  onClick={onLogout}
                  id="logout-confirm-logout-btn"
                >
                  Log Out
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default LogoutConfirmModal;
