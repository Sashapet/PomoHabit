import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import TaskForm from '../Formik/TaskForm';
import { CloseUpArea } from '../styled/Buttons/ModalButtons';
import { selectors } from '../../state';

export interface modalStateProps {
  task: string;
  show: boolean;
  taskId: string;
}
interface TasksPopUpProps {
  modalState?: modalStateProps;
  show?: boolean;
  closePopup: () => void;
}

const TasksPopUp: React.FC<TasksPopUpProps> = props => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const closeModal = useCallback(() => {
    closePopup();
  }, []);

  const { modalState, show, closePopup } = props;
  return (
    <>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalState ? modalState.show : show}
      >
        <InnerContainer />
      </Modal>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalState ? modalState.show : show}
      >
        <CloseUpArea disabled={setOnSync.loading} onPress={closeModal}>
          <CloseContainer />
        </CloseUpArea>
        <ModalContainer>
          <ModalHeader>
            {modalState ? 'Update Task' : 'Create Task'}
          </ModalHeader>
          <TaskForm modalState={modalState} />
        </ModalContainer>
      </Modal>
    </>
  );
};
const CloseContainer = styled.View`
  flex: 1;
`;
const ModalHeader = styled.Text`
  align-self: center;
  color: ${({ theme }) => theme.colors.darkHeaderString};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.NunitoBold};
  margin: 15px;
`;
const ModalContainer = styled.View`
  height: 70%;
  bottom: 0;
  position: absolute;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.paleWhite};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const InnerContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.darkScreen};
`;

export default TasksPopUp;
