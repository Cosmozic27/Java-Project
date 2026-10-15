import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from '@/components/feedback/Toast';
import { InitialLoader, StartupRevealProvider } from '@/components/common';
import { CustomCursor, SmoothScroll } from '@/components/motion';
import { router } from './routes';

export function App() {
  return (
    <StartupRevealProvider>
      <InitialLoader />
      <ToastProvider>
        <SmoothScroll>
          <RouterProvider router={router} />
          <CustomCursor />
        </SmoothScroll>
      </ToastProvider>
    </StartupRevealProvider>
  );
}

export default App;
