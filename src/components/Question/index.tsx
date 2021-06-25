import React from 'react';

import * as S from './styles';

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: React.ReactNode;
}

export const Question = ({ content, author, children }: QuestionProps) => {
  return (
    <S.Question>
      <p>{content}</p>
      <footer>
        <S.UserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </S.UserInfo>
        <div>{children}</div>
      </footer>
    </S.Question>
  );
};
