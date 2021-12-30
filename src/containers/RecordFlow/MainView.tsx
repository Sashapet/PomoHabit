import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import Timer from '../../components/Timer';
import { wHeight } from '../../utils/helpers/helpers';
import { COLORS } from '../../assets/theme';
import { actions, selectors } from '../../state';
import AnimatedButtons from '../../components/AnimatedButtons';
import PopUp from '../../components/PopUps/MainPopUp';
import PomodoroPopUp from '../../components/PopUps/PomodoroPopUp';
import PomodoroIcons from '../../components/PomodoroIcons';

const MainScreen = memo(() => {
  const dispatch = useDispatch();
  const pomodorosMin = useSelector(selectors.pomodoro.pomodorosMin);
  const pomodoroTimer = useSelector(selectors.pomodoro.pomodoroTimer);
  const selectedTaskTitle = useSelector(selectors.tasks.selectedTaskTitle);
  const mainModal = useSelector(selectors.pomodoro.mainModal);
  const [workState, setWorkState] = useState('START_SESSION');
  const startState = useSelector(selectors.pomodoro.working);
  const closeModal = useCallback(() => {
    dispatch(actions.pomodoro.showModal({ state: false, type: null }));
  }, []);

  useEffect(() => {
    // CONNECT POMODORO WATCHER
    dispatch(actions.pomodoro.fetchPomodoroData());
  }, []);

  useEffect(() => {
    if (!startState) {
      setWorkState('START SESSION');
    } else if (pomodoroTimer) {
      setWorkState('WORK');
    } else {
      setWorkState('BREAK');
    }
  }, [startState, pomodoroTimer]);

  // LOADING
  if (!pomodorosMin) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={COLORS.opacity04} />
      </LoadingContainer>
    );
  }

  return (
    <>
      <MainContainer wHeight={wHeight}>
        <TimerStatus>{workState}</TimerStatus>
        <TaskName>
          {selectedTaskTitle ? selectedTaskTitle : 'SELECT TASK'}
        </TaskName>
        <PomodoroIcons />
        <Timer />
        <AnimatedButtons />
        <PopUp show={mainModal} closePopup={closeModal} />
        <PomodoroPopUp />
      </MainContainer>
    </>
  );
});

MainScreen.displayName = 'MainScreen';

const TaskName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  font-size: 17px;
`;
const TimerStatus = styled.Text`
  color: ${({ theme }) => theme.colors.opacity04};
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  font-size: 17px;
`;

const MainContainer = styled.View<{ wHeight: number }>`
  padding-bottom: ${({ wHeight }) => wHeight * 0.1 + 'px'};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default MainScreen;
