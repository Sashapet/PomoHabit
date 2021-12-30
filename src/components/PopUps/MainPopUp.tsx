import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { CloseUpArea } from '../styled/Buttons/ModalButtons';
import { actions, selectors } from '../../state';
import { RoundedButton } from '../styled/Buttons/FormButtons';
import { CancelButton } from '../styled/Buttons/CancelButton';
import { ROUTES } from '../../routes/RouteNames';

interface ModalProps {
  state: boolean;
  type: string;
}

interface MainPopUpProps {
  show: ModalProps;
  closePopup: () => void;
}

const MainPopUp: React.FC<MainPopUpProps> = props => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const pomodoroTimer = useSelector(selectors.pomodoro.pomodoroTimer);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const closeModal = useCallback(() => {
    closePopup();
  }, []);
  const handleSkip = useCallback(() => {
    dispatch(actions.pomodoro.skip(true));
    closeModal();
  }, []);
  const handleFinish = useCallback(() => {
    closePopup();
    navigate(ROUTES.FinishStack);
    //DISCARD
    dispatch(actions.pomodoro.finish(true));
  }, []);

  let skipHeaderName;
  if (!pomodoroTimer) {
    skipHeaderName = 'Skip break?';
  } else {
    skipHeaderName = 'Skip session?';
  }

  const { show, closePopup } = props;
  return (
    <Modal animationType={'fade'} transparent={true} visible={show.state}>
      <CloseUpArea disabled={setOnSync.loading} onPress={closeModal}>
        <DarkContainer>
          <ModalContainer>
            <ModalHeader>
              {show.type === 'skip' ? skipHeaderName : 'Finish working?'}
            </ModalHeader>
            {show.type === 'skip' && (
              <SecondHeader>
                {!pomodoroTimer
                  ? 'You are skipping without completing break time.'
                  : 'You are skipping without completing working session.'}
              </SecondHeader>
            )}
            <Buttons>
              <ButtonConatiner>
                <CancelButton disabled={setOnSync.loading} onPress={closeModal}>
                  Cancel
                </CancelButton>
              </ButtonConatiner>
              <ButtonConatiner>
                <RoundedButton
                  disabled={setOnSync.loading}
                  loading={setOnSync.loading}
                  onPress={show.type === 'skip' ? handleSkip : handleFinish}
                >
                  {show.type === 'skip' ? 'Skip' : 'Finish'}
                </RoundedButton>
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
const SecondHeader = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.opacity06};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.NunitoBold};
  margin-bottom: 15px;
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

export default MainPopUp;
