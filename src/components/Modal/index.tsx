import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Modal as ModalComponent } from 'react-bootstrap';

import styles from './styles.module.scss';

interface IModalProps {
  title: string;
  children: ReactNode;
  modalIsVisible: boolean;
  setModalIsVisible: Dispatch<SetStateAction<boolean>>;
  footer?: ReactNode;
}

function Modal({
  title,
  children,
  modalIsVisible,
  setModalIsVisible,
  footer,
}: IModalProps): JSX.Element {
  const handleCloseModal = (): void => {
    setModalIsVisible(false);
  };

  return (
    <ModalComponent show={modalIsVisible} onHide={handleCloseModal}>
      <ModalComponent.Header closeButton>
        <ModalComponent.Title className={styles.ModalTitle}>
          {title}
        </ModalComponent.Title>
      </ModalComponent.Header>
      <ModalComponent.Body>{children}</ModalComponent.Body>
      {footer && <ModalComponent.Footer>{footer}</ModalComponent.Footer>}
    </ModalComponent>
  );
}

Modal.defaultProps = {
  footer: undefined,
};

export default Modal;
