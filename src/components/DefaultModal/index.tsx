import React from 'react';
import Modal from 'react-modal';

import * as S from './styles';

interface DefaultModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestModalAction: () => void;
  iconModal: React.ReactNode;
  modalInfo: {
    title: string;
    message: string;
    cancelButton: string;
    confirmButton: string;
  };
}

Modal.setAppElement('#root');

export const DefaultModal = ({
  isOpen = false,
  onRequestClose,
  onRequestModalAction,
  iconModal,
  modalInfo,
}: DefaultModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <S.Container>
        {iconModal}
        <h2>{modalInfo.title}</h2>
        <p>{modalInfo.message}</p>
        <div>
          <button type="button" onClick={onRequestClose}>
            {modalInfo.cancelButton}
          </button>
          <button
            type="button"
            className="modal-action"
            onClick={() => {
              onRequestModalAction();
              onRequestClose();
            }}
          >
            {modalInfo.confirmButton}
          </button>
        </div>
      </S.Container>
    </Modal>
  );
};
