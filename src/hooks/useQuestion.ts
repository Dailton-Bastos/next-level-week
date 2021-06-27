import { database } from '../services/firebase';

interface useQuestionProps {
  roomId: string,
  currentQuestionId: string
}

export const useQuestion = ({roomId, currentQuestionId }: useQuestionProps ) => {

  async function handleDeleteQuestion() {
    await database.ref(`/rooms/${roomId}/questions/${currentQuestionId}`).remove();
  }

  return {
    handleDeleteQuestion
  }
}
