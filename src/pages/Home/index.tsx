import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { database } from '../../services/firebase';
import { Head } from '../../components/Head';
import { ReactComponent as IlustrationImg } from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { ReactComponent as GoogleIcon } from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';

import * as S from '../../styles/auth';

export const Home = () => {
  const [roomCode, setRoomCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();
  const { addToast } = useToast();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    return history.push('/rooms/new');
  }

  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    setLoading(true);

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    setLoading(false);

    if (!roomRef.exists()) {
      addToast({
        type: 'error',
        title: 'Sala não encontrada',
        description: 'Verifique o código e tente novamente',
      });
      setHasError(true);
      return;
    }

    if (roomRef.val().endedAt) {
      addToast({
        type: 'info',
        title: 'Sala não disponível',
        description: 'Sala não disponível, tente novamente mais tarde',
      });
      setHasError(true);
      return;
    }

    setHasError(false);

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <S.Auth>
      <Head
        title="Entre ou crie sua sala com o Google"
        description="Let Me Ask - Tire as dúvidas da sua audiência em tempo-real"
      />
      <aside>
        <IlustrationImg />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <S.MainContent>
          <img src={logoImg} alt="Let Me Ask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <GoogleIcon />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em um sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              className={hasError ? 'has-error' : ''}
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={({ target }) => setRoomCode(target.value)}
            />
            {loading ? (
              <Button type="button" disabled>
                Carregando...
              </Button>
            ) : (
              <Button type="submit">Entrar na sala</Button>
            )}
          </form>
        </S.MainContent>
      </main>
      {loading && <Loading />}
    </S.Auth>
  );
};
