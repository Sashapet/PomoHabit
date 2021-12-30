import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import BackgroundTimer from 'react-native-background-timer';

import { wHeight } from '../utils/helpers/helpers';
import { actions, selectors } from '../state';

const Timer = memo(() => {
  //MIN COUNT
  const pomodorosMin = useSelector(selectors.pomodoro.pomodorosMin);
  const shortBreakMin = useSelector(selectors.pomodoro.shortBreakMin);
  //TIMER STATE
  const started = useSelector(selectors.pomodoro.started);
  const pomodoroTimer = useSelector(selectors.pomodoro.pomodoroTimer);

  //TIME IN SECS
  const [secondsLeft, setSecondsLeft] = useState(pomodorosMin * 60);

  const skip = useSelector(selectors.pomodoro.skip);
  const finish = useSelector(selectors.pomodoro.finish);
  const resetTimer = useSelector(selectors.pomodoro.resetTimer);

  const dispatch = useDispatch();

  const renderTime = (
    secs: number,
  ): {
    displayMins: number | string;
    displaySecs: number | string;
    mins: number;
    seconds: number;
  } => {
    const mins = Math.floor((secs / 60) % 60);
    const seconds = Math.floor(secs % 60);

    const displayMins = mins < 10 ? `0${mins}` : mins;
    const displaySecs = seconds < 10 ? `0${seconds}` : seconds;

    return {
      displayMins,
      displaySecs,
      mins,
      seconds,
    };
  };

  const time = useMemo(() => renderTime(secondsLeft), [secondsLeft]);
  // START TIMER
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) {
          return secs - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };
  //EDIT TIMER
  useEffect(() => {
    setSecondsLeft(pomodorosMin * 60);
  }, [pomodorosMin]);

  useEffect(() => {
    //CLEANUP
    if (resetTimer) {
      setSecondsLeft(pomodorosMin * 60);
      dispatch(actions.pomodoro.resetTimer(false));
    } else if (started) {
      startTimer();
    } else if (finish && pomodoroTimer) {
      BackgroundTimer.stopBackgroundTimer();
      //SENDING TIME TO FINISH VIEW
      dispatch(
        actions.pomodoro.setFinishTime({
          min: time.mins,
          sec: time.seconds,
        }),
      );
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [started, finish, resetTimer]);

  //TIME IS UP
  useEffect(() => {
    if (secondsLeft === 0 || skip) {
      BackgroundTimer.stopBackgroundTimer();
      dispatch(actions.pomodoro.changeButton(true)); //SET BUTTON TO START
      dispatch(actions.pomodoro.timerStop()); //STOP TIMER
      if (pomodoroTimer) {
        dispatch(actions.pomodoro.shortBreak());
        dispatch(actions.pomodoro.addSession()); //ADD SESSIOn
        setSecondsLeft(shortBreakMin * 60); //SHORT BREAK
      } else {
        dispatch(actions.pomodoro.pomodoroStart());
        setSecondsLeft(pomodorosMin * 60); //WORK
      }
      if (skip) {
        dispatch(actions.pomodoro.skip(false));
      }
    }
  }, [secondsLeft, skip]);
  return (
    <TimerText wHeight={wHeight}>
      {time.displayMins}:{time.displaySecs}
    </TimerText>
  );
});

Timer.displayName = 'Timer';

const TimerText = styled.Text<{ wHeight: number }>`
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: ${({ wHeight }) => wHeight * 0.05 + 'px'};
  font-family: ${({ theme }) => theme.fonts.MontserratLight};
  font-size: 100px;
`;

export default Timer;
