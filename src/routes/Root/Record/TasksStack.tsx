import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity as BackButton } from 'react-native';
import styled from 'styled-components/native';
import { default as PlusIcon } from 'react-native-vector-icons/Fontisto';
import { useDispatch } from 'react-redux';

import { COLORS } from '../../../assets/theme';
import TasksView from '../../../containers/RecordFlow/TasksView';
import { actions } from '../../../state';
import { ROUTES } from '../../RouteNames';

const Stack = createStackNavigator();
const TasksStack = () => {
  const { navigate } = useNavigation();
  const navigateHome = useCallback(() => {
    navigate(ROUTES.HomeView);
  }, []);
  const dispatch = useDispatch();
  const openModal = useCallback(() => {
    dispatch(actions.tasks.showCreateModal(true));
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'TODO',
        headerTitleAlign: 'center',
        headerRightContainerStyle: {
          paddingRight: 20,
        },
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
        headerLeft() {
          return (
            <BackButton onPress={navigateHome}>
              <BackText>Back</BackText>
            </BackButton>
          );
        },
        headerRight() {
          return (
            <PlusIcon
              onPress={openModal}
              name="plus-a"
              size={25}
              color={COLORS.secondary}
            />
          );
        },
      }}
    >
      <Stack.Screen name={ROUTES.TasksView} component={TasksView} />
    </Stack.Navigator>
  );
};

export const BackText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MontserratBold};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: -1px;
`;
TasksStack.displayName = 'TasksStack';

export default TasksStack;
