import { ReactComponent as IconWithinQuestion } from '../../assets/images/without-questions.svg';

import * as S from './styles';

export const WithoutQuestions = () => {
  return (
    <S.Container>
      <IconWithinQuestion />
      <h2>Nenhuma pergunta por aqui...</h2>
      <p>Seja a primeira pessoa a fazer uma pergunta!</p>
    </S.Container>
  );
};
