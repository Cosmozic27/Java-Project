/**
 * FoodBridge Centralized Design Tokens
 * 
 * Single source of truth for color system, typography, spacing, 
 * shadows, and radius values across the entire platform.
 */

export const COLORS = Object.freeze({
  primary: {
    DEFAULT: '#16A34A',
    dark: '#15803D',
    light: '#DCFCE7',
    hover: '#15803D',
  },
  accent: {
    DEFAULT: '#84CC16',
    hover: '#65A30D',
    light: '#ECFCCB',
  },
  background: {
    DEFAULT: '#F7FAF8',
    subtle: '#F0F5F2',
  },
  surface: {
    DEFAULT: '#FFFFFF',
    elevated: '#FFFFFF',
    muted: '#F8FAF9',
  },
  text: {
    primary: '#17211C',
    secondary: '#64748B',
    muted: '#94A3B8',
    inverse: '#FFFFFF',
  },
  border: {
    DEFAULT: '#E2E8E4',
    strong: '#CBD5E1',
    subtle: '#EEF2F0',
  },
  state: {
    success: {
      DEFAULT: '#16A34A',
      surface: '#F0FDF4',
      border: '#BBF7D0',
      text: '#166534',
    },
    warning: {
      DEFAULT: '#F59E0B',
      surface: '#FFFBEB',
      border: '#FDE68A',
      text: '#B45309',
    },
    danger: {
      DEFAULT: '#EF4444',
      surface: '#FEF2F2',
      border: '#FECACA',
      text: '#B91C1C',
    },
    info: {
      DEFAULT: '#2563EB',
      surface: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1D4ED8',
    },
  },
});

export const TYPOGRAPHY = Object.freeze({
  fontFamily: {
    sans: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
});

export const SHADOWS = Object.freeze({
  sm: '0 1px 2px 0 rgba(23, 33, 28, 0.05)',
  base: '0 1px 3px 0 rgba(23, 33, 28, 0.08), 0 1px 2px -1px rgba(23, 33, 28, 0.08)',
  md: '0 4px 6px -1px rgba(23, 33, 28, 0.07), 0 2px 4px -2px rgba(23, 33, 28, 0.05)',
  lg: '0 10px 15px -3px rgba(23, 33, 28, 0.06), 0 4px 6px -4px rgba(23, 33, 28, 0.04)',
});

export const RADIUS = Object.freeze({
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
});

export default {
  colors: COLORS,
  typography: TYPOGRAPHY,
  shadows: SHADOWS,
  radius: RADIUS,
};
