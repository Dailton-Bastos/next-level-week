import React from 'react';
import { v4 as uuid } from 'uuid';
import { ToastContainer } from '../components/ToastContainer';

interface ToastContextProps {
  children: React.ReactNode;
}

interface ToastContextTypes {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const ToastContext = React.createContext({} as ToastContextTypes);

export const ToastStorage = ({ children }: ToastContextProps) => {
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const addToast = React.useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((state) => [...state, toast]);
    },
    [],
  );

  const removeToast = React.useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};
