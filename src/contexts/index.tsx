import React from 'react';
import { AuthStorage } from './AuthContext';
import { ToastStorage } from './ToastContext';

interface AppStorageProps {
  children: React.ReactNode;
}

export const AppStorage = ({ children }: AppStorageProps) => {
  return (
    <AuthStorage>
      <ToastStorage>{children}</ToastStorage>
    </AuthStorage>
  );
};
