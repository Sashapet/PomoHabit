import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import Numeric from '../NumericInput';
import { actions, selectors } from '../../state';
import { RoundedButton } from '../styled/Buttons/FormButtons';

const EditPomodoroForm: React.FC = memo(() => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const pomodorosMin = useSelector(selectors.pomodoro.pomodorosMin);
  const shortBreakMin = useSelector(selectors.pomodoro.shortBreakMin);
  const dispatch = useDispatch();
  const [pomodoros, setPomodoros] = useState(pomodorosMin);
  const [shortBreak, setBreak] = useState(shortBreakMin);

  const handleSubmit = useCallback(() => {
    dispatch(actions.pomodoro.editPomodoro({ pomodoros, shortBreak }));
  }, [pomodoros, shortBreak]);
  return (
    <>
      <FormContainer>
        <InputContainer>
          <Label>Pomodoros</Label>
          <Numeric number={pomodoros} setNumber={setPomodoros} />
          <Label>Short Break</Label>
          <Numeric number={shortBreak} setNumber={setBreak} />

          <ButtonContainer>
            <RoundedButton
              loading={setOnSync.loading}
              disabled={setOnSync.loading}
              onPress={handleSubmit}
            >
              UPDATE SETTINGS
            </RoundedButton>
          </ButtonContainer>
        </InputContainer>
      </FormContainer>
    </>
  );
});

const ButtonContainer = styled.View`
  height: 70px;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MontserratRegular};
  font-size: 15px;
  padding-vertical: 10px;
`;

const InputContainer = styled.View`
  width: 90%;
  margin: 0 auto;
  align-items: center;
`;

const FormContainer = styled.View`
  flex: 1;
  width: 100%;
`;

EditPomodoroForm.displayName = 'EditPomodoroForm';
export default EditPomodoroForm;
