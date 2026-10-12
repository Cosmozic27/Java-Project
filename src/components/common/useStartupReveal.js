import { useContext } from 'react';
import { StartupRevealContext } from './startupRevealStore';

export function useStartupReveal() {
  const context = useContext(StartupRevealContext);
  if (!context) throw new Error('useStartupReveal must be used inside StartupRevealProvider');
  return context;
}
