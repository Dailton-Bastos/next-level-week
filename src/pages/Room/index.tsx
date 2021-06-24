import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';

import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';

import * as S from './styles';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

interface Question {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

interface RoomParams {
  id: string;
}

export const Room = () => {
  const [newQuestion, setNewQuestion] = React.useState('');
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [title, setTitle] = React.useState('');

  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;

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

  React.useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, valeu]) => {
          return {
            id: key,
            content: valeu.content,
            author: valeu.author,
            isHighlighted: valeu.isHighlighted,
            isAnswered: valeu.isAnswered,
          };
        },
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  return (
    <S.Container>
      <header>
        <div className="content">
          <Link to="/">
            <LogoImg />
          </Link>
          <RoomCode code={roomId} />
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
            {user ? (
              <S.UserInfo>
                <img src={user.avatar} alt={user.avatar} />
                <span>{user.name}</span>
              </S.UserInfo>
            ) : (
              <span>
                Para enviar uma pergunta,
                <button type="button"> faça seu login</button>.
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </S.MainContent>
    </S.Container>
  );
};
