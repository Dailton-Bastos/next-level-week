import React from 'react';
import classnames from 'classnames';

import * as S from './styles';

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: React.ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export const Question = ({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) => {
  return (
    <S.Question
      className={classnames({
        answered: isAnswered,
        highlighted: isHighlighted && !isAnswered,
      })}
    >
      <p>{content}</p>
      <footer>
        <S.UserInfo className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </S.UserInfo>
        <div>{children}</div>
      </footer>
    </S.Question>
  );
};
