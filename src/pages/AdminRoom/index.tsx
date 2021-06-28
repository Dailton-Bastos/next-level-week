import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { useQuestion } from '../../hooks/useQuestion';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { database } from '../../services/firebase';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { Loading } from '../../components/Loading';
import { IconDelete } from '../../components/IconDelete';
import { IconAlert } from '../../components/IconAlert';
import { DefaultModal } from '../../components/DefaultModal';
import { WithoutQuestions } from '../../components/WithoutQuestions';
import { Head } from '../../components/Head';

import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg';
import { ReactComponent as CheckIcon } from '../../assets/images/check.svg';
import { ReactComponent as AnswerIcon } from '../../assets/images/answer.svg';

import * as S from './styles';

interface RoomParams {
  id: string;
}

const modalDeleteQuestionInfo = {
  title: 'Excluir pergunta',
  message: 'Tem certeza que você deseja excluir está pergunta?',
  cancelButton: 'Cancelar',
  confirmButton: 'Sim, excluir',
};

const modalEndRoomInfo = {
  title: 'Encerrar sala',
  message: 'Tem certeza que você deseja encerrar está sala?',
  cancelButton: 'Cancelar',
  confirmButton: 'Sim, encerrar',
};

export const AdminRoom = () => {
  const [isOpenEndRoomModal, setIsOpenEndRoomModal] = React.useState(false);
  const [isOpenDeleteQuestionModal, setIsOpenDeleteQuestionModal] =
    React.useState(false);
  const [currentQuestionId, setCurrentQuestionId] = React.useState('');

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions, loading } = useRoom(roomId);

  const { handleDeleteQuestion } = useQuestion({ roomId, currentQuestionId });

  const { signOutApp } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  function handleOpenEndRoomModal() {
    setIsOpenEndRoomModal(true);
  }

  function handleCloseEndRoomModal() {
    setIsOpenEndRoomModal(false);
  }

  function handleOpenDeleteQuestionModal() {
    setIsOpenDeleteQuestionModal(true);
  }

  function handleCloseDeleteQuestionModal() {
    setIsOpenDeleteQuestionModal(false);
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    await signOutApp();

    addToast({
      type: 'success',
      title: 'Sala encerrada',
    });

    history.push('/');
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
      <Head title={title} description={title} />
      <header>
        <div className="content">
          <Link to="/">
            <LogoImg />
          </Link>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleOpenEndRoomModal}>
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

        {questions.length < 1 && <WithoutQuestions />}

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
                    onClick={() => {
                      handleOpenDeleteQuestionModal();
                      setCurrentQuestionId(id);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </Question>
              );
            },
          )}
        </div>
      </S.MainContent>

      <DefaultModal
        isOpen={isOpenEndRoomModal}
        onRequestClose={handleCloseEndRoomModal}
        onRequestModalAction={handleEndRoom}
        iconModal={<IconAlert />}
        modalInfo={modalEndRoomInfo}
      />

      <DefaultModal
        isOpen={isOpenDeleteQuestionModal}
        onRequestClose={handleCloseDeleteQuestionModal}
        onRequestModalAction={handleDeleteQuestion}
        iconModal={<IconDelete />}
        modalInfo={modalDeleteQuestionInfo}
      />
      {loading && <Loading />}
    </S.Container>
  );
};
