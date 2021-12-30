import React from 'react';
import styled from 'styled-components/native';
import { default as FruitIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { COLORS } from '../assets/theme';
import { selectors } from '../state';

const PomodoroIcons = () => {
  const sessions = useSelector(selectors.pomodoro.sessions);
  return (
    <PomodoroIconsContainer>
      {[...Array(sessions)].map((_icon, key) => (
        <FruitIcon
          key={key}
          name={'food-apple'}
          size={20}
          color={COLORS.secondary}
        />
      ))}
    </PomodoroIconsContainer>
  );
};
const PomodoroIconsContainer = styled.View`
  flex-direction: row;
`;

export default PomodoroIcons;
