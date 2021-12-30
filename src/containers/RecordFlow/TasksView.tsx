import React, { memo, useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { LoadingContainer } from './MainView';
import { COLORS } from '../../assets/theme';
import BottomPopup from '../../components/PopUps/TasksPopUp';
import Todo from '../../components/Todo';
import { actions, selectors } from '../../state';

const TasksView = memo(() => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectors.tasks.tasks);

  const createModal = useSelector(selectors.tasks.showCreateModal);
  const updateModal = useSelector(selectors.tasks.showUpdateModal);
  const closeUpdateModal = useCallback(() => {
    dispatch(
      actions.tasks.showUpdateModal({ show: false, task: null, taskId: null }),
    );
  }, []);

  const closeCreateModal = useCallback(() => {
    dispatch(actions.tasks.showCreateModal(false));
  }, []);

  useEffect(() => {
    dispatch(actions.tasks.fetchPomodoroData());
  }, []);
  //LOADING
  if (!tasks) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={COLORS.opacity04} />
      </LoadingContainer>
    );
  }
  return (
    <TasksContainer>
      <FlatList
        style={styles.flastList}
        data={tasks}
        keyExtractor={item => item.taskId}
        renderItem={({ item }) => (
          <Todo itemInfo={{ name: item.title, taskId: item.taskId }} />
        )}
      />
      <BottomPopup modalState={updateModal} closePopup={closeUpdateModal} />
      <BottomPopup show={createModal} closePopup={closeCreateModal} />
    </TasksContainer>
  );
});
TasksView.displayName = 'TasksView';
const styles = StyleSheet.create({
  flastList: {
    width: '100%',
  },
});
const TasksContainer = styled.View`
  padding-top: 10px;
  flex: 1;
  align-items: center;
`;

export default TasksView;
