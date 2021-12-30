import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { CloseUpArea } from '../styled/Buttons/ModalButtons';
import { actions, selectors } from '../../state';
import { RoundedButton } from '../styled/Buttons/FormButtons';
import { CancelButton } from '../styled/Buttons/CancelButton';
import { ROUTES } from '../../routes/RouteNames';

interface MainPopUpProps {
  show: boolean;
  handlePopUp?: React.Dispatch<React.SetStateAction<boolean>>;
  logOut?: boolean;
}

const SecondaryPopUp: React.FC<MainPopUpProps> = ({
  show,
  handlePopUp,
  logOut,
}) => {
  const navigation = useNavigation();
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const dispatch = useDispatch();
  const closeModal = useCallback(() => {
    if (logOut) {
      dispatch(actions.auth.showLogOutModal(false));
    } else {
      handlePopUp(false);
    }
  }, []);

  const handleLogOut = useCallback(async () => {
    closeModal();
    await navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTES.Profile }],
      }),
    );
    await dispatch(actions.auth.logOut());
  }, []);

  const handleDiscard = useCallback(() => {
    //CLEAN TIMER
    dispatch(actions.pomodoro.resetTimer(true));
    dispatch(actions.pomodoro.setWorking(false));
    dispatch(actions.pomodoro.finish(false));
    dispatch(actions.pomodoro.changeButton(true));
    dispatch(actions.pomodoro.timerStop());
    dispatch(actions.pomodoro.cleanSessions());
    //CLOSE AND NAVIGATE BACK
    closeModal();
    navigation.goBack();
    //CLEAN FINISH TIME DATA
    dispatch(actions.pomodoro.setFinishTime({ min: null, sec: null }));
  }, []);

  return (
    <Modal animationType={'fade'} transparent={true} visible={show}>
      <CloseUpArea disabled={setOnSync.loading} onPress={closeModal}>
        <DarkContainer>
          <ModalContainer>
            <ModalHeader>Are you sure?</ModalHeader>
            <Buttons>
              <ButtonConatiner>
                <CancelButton disabled={setOnSync.loading} onPress={closeModal}>
                  Cancel
                </CancelButton>
              </ButtonConatiner>
              <ButtonConatiner>
                {logOut ? (
                  <RoundedButton
                    disabled={setOnSync.loading}
                    onPress={handleLogOut}
                  >
                    Log Out
                  </RoundedButton>
                ) : (
                  <RoundedButton
                    disabled={setOnSync.loading}
                    onPress={handleDiscard}
                  >
                    Discard
                  </RoundedButton>
                )}
              </ButtonConatiner>
            </Buttons>
          </ModalContainer>
        </DarkContainer>
      </CloseUpArea>
    </Modal>
  );
};

const ModalHeader = styled.Text`
  color: ${({ theme }) => theme.colors.darkHeaderString};
  font-size: 25px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  margin: 15px;
`;
const Buttons = styled.View`
  flex-direction: row;
`;
const ButtonConatiner = styled.View`
  width: 40%;
  height: 60px;
  margin-bottom: 15px;
  margin-horizontal: 15px;
`;

const ModalContainer = styled.View`
  min-height: 160px;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.paleWhite};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const DarkContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.darkScreen};
  justify-content: center;
  align-items: center;
`;

export default SecondaryPopUp;
