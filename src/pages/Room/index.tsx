import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { IconLike } from '../../components/IconLike';
import { Loading } from '../../components/Loading';
import { WithoutQuestions } from '../../components/WithoutQuestions';
import { Head } from '../../components/Head';

import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';

import * as S from './styles';

interface RoomParams {
  id: string;
}

export const Room = () => {
  const [newQuestion, setNewQuestion] = React.useState('');

  const { user, signInWithGoogle } = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions, loading } = useRoom(roomId);

  async function handleSendQuestion(event: React.FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') return;

    if (!user) throw new Error('You must be logged in!');

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined,
  ) {
    if (likeId) {
      await database
        .ref(`/rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database
        .ref(`/rooms/${roomId}/questions/${questionId}/likes`)
        .push({
          authorId: user?.id,
        });
    }
  }

  return (
    <S.Container>
      <Head title={title} description={title} />
      <header>
        <div className="content">
          <Link to="/">
            <LogoImg />
          </Link>
          <aside>
            {user && (
              <Link to={`/admin/rooms/${roomId}`}>
                <S.UserInfo>
                  <img src={user.avatar} alt={user.avatar} />
                  <span>{user.name}</span>
                </S.UserInfo>
              </Link>
            )}

            <RoomCode code={roomId} />
          </aside>
        </div>
      </header>

      <S.MainContent>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={({ target }) => setNewQuestion(target.value)}
          />

          <div className="form-footer">
            {!user && (
              <span>
                Para enviar uma pergunta,
                <button type="button" onClick={signInWithGoogle}>
                  {' '}
                  faça seu login
                </button>
                .
              </span>
            )}

            <Button type="submit" disabled={!user || loading}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {questions.length < 1 && <WithoutQuestions />}

        <div className="question-list">
          {questions.map(
            ({
              id,
              content,
              author,
              isAnswered,
              isHighlighted,
              likeCount,
              likeId,
            }) => {
              return (
                <Question
                  key={id}
                  content={content}
                  author={author}
                  isAnswered={isAnswered}
                  isHighlighted={isHighlighted}
                >
                  {!isAnswered && (
                    <button
                      className={`like-button ${likeId ? 'liked' : ''}`}
                      type="button"
                      aria-label="Marcar como gostei"
                      onClick={() => handleLikeQuestion(id, likeId)}
                    >
                      {likeCount > 0 && <span>{likeCount}</span>}
                      <IconLike />
                    </button>
                  )}
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
