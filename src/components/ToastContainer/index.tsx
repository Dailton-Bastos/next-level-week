import { useTransition } from 'react-spring';
import { ToastMessage } from '../../contexts/ToastContext';
import { Toast } from './Toast';

import * as S from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

export const ToastContainer = ({ messages }: ToastContainerProps) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <S.Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </S.Container>
  );
};
