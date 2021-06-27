import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { Loading } from '../../components/Loading';

import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg';
import { ReactComponent as CheckIcon } from '../../assets/images/check.svg';
import { ReactComponent as AnswerIcon } from '../../assets/images/answer.svg';

import * as S from './styles';

interface RoomParams {
  id: string;
}

export const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions, loading } = useRoom(roomId);

  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <S.Container>
      <header>
        <div className="content">
          <Link to="/">
            <LogoImg />
          </Link>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <S.MainContent>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(
            ({ id, content, author, isAnswered, isHighlighted }) => {
              return (
                <Question
                  key={id}
                  content={content}
                  author={author}
                  isAnswered={isAnswered}
                  isHighlighted={isHighlighted}
                >
                  {!isAnswered && (
                    <React.Fragment>
                      <button
                        aria-label="Marcar pergunta como respondida"
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(id)}
                      >
                        <CheckIcon />
                      </button>

                      <button
                        aria-label="Dar destaque à pergunta"
                        type="button"
                        onClick={() => handleHighlightQuestion(id)}
                      >
                        <AnswerIcon />
                      </button>
                    </React.Fragment>
                  )}
                  <button
                    aria-label="Remover pergunta"
                    type="button"
                    onClick={() => handleDeleteQuestion(id)}
                  >
                    <DeleteIcon />
                  </button>
                </Question>
              );
            },
          )}
        </div>
      </S.MainContent>
      {loading && <Loading />}
    </S.Container>
  );
};
