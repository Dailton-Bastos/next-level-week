import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { ReactComponent as IlustrationImg } from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';

import * as S from '../../styles/auth';

export const NewRoom = () => {
  const { user } = useAuth();

  const [newRoom, setNewRoom] = React.useState('');

  const history = useHistory();

  async function handleCreateRoom(event: React.FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={({ target }) => setNewRoom(target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </S.MainContent>
      </main>
    </S.Auth>
  );
};
