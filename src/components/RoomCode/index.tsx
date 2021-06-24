import React from 'react';
import { ReactComponent as CopyIcon } from '../../assets/images/copy.svg';

import * as S from './styles';

interface RoomCodeProps {
  code: string;
}

export const RoomCode = (props: RoomCodeProps) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <S.RoomCode onClick={copyRoomCodeToClipboard}>
      <div>
        <CopyIcon />
      </div>

      <span>Sala {props.code}</span>
    </S.RoomCode>
  );
};
