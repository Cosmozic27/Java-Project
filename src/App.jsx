import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from '@/components/feedback/Toast';
import { CustomCursor, SmoothScroll } from '@/components/motion';
import { router } from './routes';

export function App() {
  return (
    <ToastProvider>
      <SmoothScroll>
        <RouterProvider router={router} />
        <CustomCursor />
      </SmoothScroll>
    </ToastProvider>
  );
}

export default App;
