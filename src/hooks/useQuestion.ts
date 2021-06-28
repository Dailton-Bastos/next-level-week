import { database } from '../services/firebase';
import { useToast } from '../hooks/useToast';

interface useQuestionProps {
  roomId: string,
  currentQuestionId: string
}

export const useQuestion = ({roomId, currentQuestionId }: useQuestionProps ) => {
  const { addToast } = useToast();

  async function handleDeleteQuestion() {
    await database.ref(`/rooms/${roomId}/questions/${currentQuestionId}`).remove();
    addToast({
      type: 'success',
      title: 'Pergunta excluida',
    });
  }

  return {
    handleDeleteQuestion
  }
}
