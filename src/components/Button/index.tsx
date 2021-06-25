import { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button = ({ isOutlined = false, ...props }: ButtonProps) => {
  return <S.Button {...props} className={isOutlined ? 'outlined' : ''} />;
};
