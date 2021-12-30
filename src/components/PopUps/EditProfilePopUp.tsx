import React, { useCallback, useEffect } from 'react';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import EditProfileFrom from '../Formik/EditProfileForm';
import { CloseUpArea } from '../styled/Buttons/ModalButtons';
import { selectors } from '../../state';

interface TasksPopUpProps {
  show: boolean;
  closePopUp: () => void;
}

const EditProfilePupUp: React.FC<TasksPopUpProps> = props => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const closeModal = useCallback(() => {
    closePopUp();
  }, []);

  useEffect(() => {
    if (!setOnSync.loading) {
      closeModal();
    }
  }, [setOnSync]);

  const { show, closePopUp } = props;
  return (
    <>
      <Modal animationType={'fade'} transparent={true} visible={show}>
        <InnerContainer />
      </Modal>
      <Modal animationType={'slide'} transparent={true} visible={show}>
        <CloseUpArea disabled={setOnSync.loading} onPress={closeModal}>
          <CloseContainer />
        </CloseUpArea>
        <ModalContainer>
          <ModalHeader>Edit Profile</ModalHeader>
          <EditProfileFrom />
        </ModalContainer>
      </Modal>
    </>
  );
};
const CloseContainer = styled.View`
  flex: 1;
`;
const InnerContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.darkScreen};
`;
const ModalHeader = styled.Text`
  align-self: center;
  color: ${({ theme }) => theme.colors.darkHeaderString};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.NunitoBold};
  margin: 15px;
`;
const ModalContainer = styled.View`
  height: 90%;
  bottom: 0;
  position: absolute;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.paleWhite};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export default EditProfilePupUp;
