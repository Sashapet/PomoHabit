import React, { memo, useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StyleSheet, TextInput } from 'react-native';

import { validations } from '../../validation/validation';
import { RoundedButton } from '../styled/Buttons/FormButtons';
import { COLORS, FONTS } from '../../assets/theme';
import { actions, selectors } from '../../state';
import { modalStateProps } from '../PopUps/TasksPopUp';
import { DeleteButton } from '../styled/Buttons/TaskFormButtons';

const TaskForm: React.FC<{ modalState: modalStateProps }> = memo(
  ({ modalState }) => {
    const dispatch = useDispatch();
    const setOnSync = useSelector(selectors.theme.setOnSync);
    const task = modalState?.task;
    const taskId = modalState?.taskId;
    const handleDelete = useCallback(() => {
      dispatch(actions.tasks.deleteTask(taskId));
    }, []);

    const initialValues = {
      title: task ? task : '',
    };
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={async data => {
          if (modalState) {
            if (data.title !== task) {
              dispatch(
                actions.tasks.updateTask({
                  title: data.title,
                  taskId: taskId,
                }),
              );
            }
          } else {
            dispatch(actions.tasks.createTask(data.title));
          }
        }}
        validationSchema={validations.task}
      >
        {({ handleSubmit, values, handleChange }) => (
          <>
            <FormContainer>
              <TextInput
                style={styles.input}
                placeholder={'Title'}
                placeholderTextColor={COLORS.black}
                underlineColorAndroid="transparent"
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <ButtonContainer>
                <RoundedButton
                  onPress={handleSubmit}
                  disabled={setOnSync.loading}
                  loading={setOnSync.loading}
                >
                  {task ? 'Update' : 'Create'}
                </RoundedButton>
              </ButtonContainer>
              {task && (
                <DeleteButton
                  disabled={setOnSync.loading}
                  onPress={handleDelete}
                >
                  Delete Task
                </DeleteButton>
              )}
            </FormContainer>
          </>
        )}
      </Formik>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    borderBottomColor: COLORS.opacity03,
    borderBottomWidth: 2,
    color: COLORS.black,
    fontFamily: FONTS.NunitoSemiBold,
    fontSize: 17,
    marginBottom: 20,
    paddingBottom: 10,
  },
});
const ButtonContainer = styled.View`
  height: 100px;
`;
const FormContainer = styled.View`
  width: 80%;
  margin: 0 auto;
  padding-bottom: 20px;
`;

TaskForm.displayName = 'TaskForm';
export default TaskForm;
