import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from '@/components/feedback/Toast';
import { router } from './routes';

export function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
