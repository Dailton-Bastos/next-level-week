import React from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage } from '../../../contexts/ToastContext';
import { useToast } from '../../../hooks/useToast';

import * as S from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

export const Toast = ({ message, style }: ToastProps) => {
  const { removeToast } = useToast();

  React.useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 3000);

    return () => clearTimeout(timer);
  }, [removeToast, message.id]);

  return (
    <S.Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button
        type="button"
        aria-label="Fechar mensagem"
        onClick={() => removeToast(message.id)}
      >
        <FiXCircle size={18} />
      </button>
    </S.Container>
  );
};
