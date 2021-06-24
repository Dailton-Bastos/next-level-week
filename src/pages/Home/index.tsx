import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { ReactComponent as IlustrationImg } from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { ReactComponent as GoogleIcon } from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';

import * as S from '../../styles/auth';

export const Home = () => {
  const [roomCode, setRoomCode] = React.useState('');
  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    return history.push('/rooms/new');
  }

  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <S.Auth>
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
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={({ target }) => setRoomCode(target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </S.MainContent>
      </main>
    </S.Auth>
  );
};
