import React from 'react'
import { useAuth } from './useAuth';
import { database } from '../services/firebase';

interface QuestionType {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

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
    likes: Record<string, {
      authorId: string;
    }>
  }
>;

export const useRoom = (roomId: string) => {
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  const [title, setTitle] = React.useState('');

  const { user } = useAuth()

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
            likeCount: Object.values(valeu.likes ?? {}).length,
            likeId: Object.entries(valeu.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
          };
        },
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => roomRef.off('value')

  }, [roomId, user?.id]);
  
  return {
    questions,
    title
  }
}
