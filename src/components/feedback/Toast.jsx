import React, { useState, useCallback } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContext } from './ToastContext';
import { cn } from '@/utils/cn';

const toastVariants = {
  success: {
    classes: 'border-green-200 bg-surface text-text-primary',
    iconColor: 'text-primary',
    barColor: 'bg-primary',
    icon: CheckCircle2,
  },
  error: {
    classes: 'border-red-200 bg-surface text-text-primary',
    iconColor: 'text-danger',
    barColor: 'bg-danger',
    icon: AlertCircle,
  },
  warning: {
    classes: 'border-amber-200 bg-surface text-text-primary',
    iconColor: 'text-amber-500',
    barColor: 'bg-amber-500',
    icon: AlertTriangle,
  },
  info: {
    classes: 'border-blue-200 bg-surface text-text-primary',
    iconColor: 'text-info',
    barColor: 'bg-info',
    icon: Info,
  },
};

export function ToastItem({ toast, onDismiss }) {
  const config = toastVariants[toast.type] || toastVariants.info;
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      className={cn(
        'relative flex items-start gap-3 w-80 sm:w-96 rounded-xl border p-4 shadow-lg backdrop-blur-xs select-none overflow-hidden',
        config.classes
      )}
      role="alert"
    >
      {/* Accent left line indicator */}
      <span className={cn('absolute left-0 top-0 bottom-0 w-1', config.barColor)} />

      <div className={cn('shrink-0 mt-0.5', config.iconColor)}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0 pr-2">
        {toast.title && (
          <h4 className="text-xs sm:text-sm font-semibold text-text-primary tracking-tight">
            {toast.title}
          </h4>
        )}
        {toast.message && (
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="rounded-md p-1 text-text-secondary hover:bg-background-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors cursor-pointer"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    ({ title, message, type = 'info', duration = 4000 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast = { id, title, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss]
  );

  const toastMethods = {
    show,
    dismiss,
    success: (message, title = 'Success') =>
      show({ type: 'success', title, message }),
    error: (message, title = 'Error') =>
      show({ type: 'error', title, message }),
    warning: (message, title = 'Warning') =>
      show({ type: 'warning', title, message }),
    info: (message, title = 'Information') =>
      show({ type: 'info', title, message }),
  };

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      {/* Toast viewport overlay container */}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 pointer-events-none items-end max-w-full"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
