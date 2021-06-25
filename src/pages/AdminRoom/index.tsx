import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';

import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg';

import * as S from './styles';

interface RoomParams {
  id: string;
}

export const AdminRoom = () => {
  // const { user } = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

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
          {questions.map(({ id, content, author }) => {
            return (
              <Question key={id} content={content} author={author}>
                <button
                  aria-label="Remover pergunta"
                  type="button"
                  onClick={() => handleDeleteQuestion(id)}
                >
                  <DeleteIcon />
                </button>
              </Question>
            );
          })}
        </div>
      </S.MainContent>
    </S.Container>
  );
};
