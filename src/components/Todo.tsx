import React, { useCallback } from 'react';
import styled, { css } from 'styled-components/native';
import { default as TodoIcon } from 'react-native-vector-icons/Ionicons';
import { default as OptionIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as StartIcon } from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import { actions, selectors } from '../state';
import { COLORS } from '../assets/theme';

const Todo: React.FC<{
  itemInfo: { name: string; taskId: string };
}> = ({ itemInfo }) => {
  const { taskId, name } = itemInfo;
  const dispatch = useDispatch();
  const selectedTaskId = useSelector(selectors.tasks.selectedTaskId);
  const handleSelect = useCallback(() => {
    dispatch(actions.tasks.selectTask({ taskId, title: name }));
  }, [name]);
  return (
    <TouchableOpacity onPress={handleSelect}>
      <TodoContainer active={selectedTaskId === taskId ? true : false}>
        <InnerContainer>
          <Upper>
            <Description>
              <Icon>
                <TodoIcon
                  name={'md-timer'}
                  size={30}
                  color={COLORS.opacity06}
                />
              </Icon>
              <PomodorosInfo>
                <Task>{name}</Task>
              </PomodorosInfo>
            </Description>
            <TodoOptions>
              <OptionIcon
                name={'dots-vertical'}
                size={30}
                color={COLORS.opacity06}
                onPress={() =>
                  dispatch(
                    actions.tasks.showUpdateModal({
                      show: true,
                      task: name,
                      taskId,
                    }),
                  )
                }
              />
            </TodoOptions>
          </Upper>
          <Lower>
            <TimeDisplay>START</TimeDisplay>
            <StartIcon
              name={'arrow-right-circle'}
              size={25}
              color={COLORS.opacity06}
            />
          </Lower>
        </InnerContainer>
      </TodoContainer>
    </TouchableOpacity>
  );
};
const TimeDisplay = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MontserratBold};
  padding-vertical: 7px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  padding-right: 2px;
`;
const Lower = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  align-items: center;
  justify-content: center;
`;
const TodoOptions = styled.View`
  margin-right: -15px;
`;

const Task = styled.Text`
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  font-size: 15px;
  padding-left: 5px;
  color: ${({ theme }) => theme.colors.black};
`;
const PomodorosInfo = styled.View`
  padding-left: 5px;
  align-items: flex-start;
`;
const Icon = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 3px;
`;
const Description = styled.View`
  align-items: center;
  flex-direction: row;
`;
const Upper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const TodoContainer = styled.View<{ active: boolean }>`
  width: 90%;
  margin: 0 auto;
  max-width: 320px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.opacity03};
  padding-vertical: 10px;
  ${({ theme, active }) =>
    active &&
    css`
      border: 3px solid ${theme.colors.secondary};
    `};
  margin-top: 10px;
`;
const InnerContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`;

export default Todo;
