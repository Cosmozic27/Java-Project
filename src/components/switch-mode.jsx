import { Moon, Sun } from 'lucide-react';

export function SwitchMode({ theme, onToggle }) {
  const isDark = theme === 'dark';
  const nextMode = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextMode} mode`}
      aria-pressed={isDark}
      title={`Switch to ${nextMode} mode`}
      className="fb-theme-switch inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-primary/50 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {isDark ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-warning" />}
      <span className="hidden sm:inline">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      <span aria-hidden="true" className="fb-theme-switch__track">
        <span className="fb-theme-switch__thumb" />
      </span>
    </button>
  );
}

export default SwitchMode;

