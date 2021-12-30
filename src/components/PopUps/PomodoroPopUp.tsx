import React, { memo, useCallback } from 'react';
import { Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import EditPomodoroForm from '../Formik/EditPomodoroForm';
import { CloseUpArea } from '../styled/Buttons/ModalButtons';
import { actions, selectors } from '../../state';

const PomodoroPopUp = memo(() => {
  const dispatch = useDispatch();
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const pomodoroModal = useSelector(selectors.pomodoro.pomodoroModal);
  const closeModal = useCallback(() => {
    dispatch(actions.pomodoro.showPomodoroModal(false));
  }, []);

  return (
    <>
      <Modal animationType={'fade'} transparent={true} visible={pomodoroModal}>
        <InnerContainer />
      </Modal>
      <Modal animationType={'slide'} transparent={true} visible={pomodoroModal}>
        <CloseUpArea disabled={setOnSync.loading} onPress={closeModal}>
          <CloseContainer />
        </CloseUpArea>
        <ModalContainer>
          <ModalHeader>Pomodoro Settings</ModalHeader>
          <EditPomodoroForm />
        </ModalContainer>
      </Modal>
    </>
  );
});
PomodoroPopUp.displayName = 'PomodoroPopUp';
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
  height: 80%;
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

export default PomodoroPopUp;
