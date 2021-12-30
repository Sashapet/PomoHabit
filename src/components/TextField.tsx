import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { FormikErrors, useField, useFormikContext } from 'formik';
import { TextInputProps } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../assets/theme/colors';
import MyInput from './MyInput';
import { FormValues } from '../types/FormikTypes';
import { selectors } from '../state';

export interface InputProps extends TextInputProps {
  name: string;
  placeholder: string;
  email?: boolean;
  password?: boolean;
  firstname?: boolean;
  lastname?: boolean;
  passwordConfirmation?: boolean;
}

const Input: React.FC<InputProps> = props => {
  const [iconColor, setIconColor] = useState(COLORS.opacity06);
  const [receivedErrors, setReceivedErrors] = useState(false);
  const { name, email, firstname, lastname, passwordConfirmation, password } =
    props;
  const theme = useSelector(selectors.theme.theme);
  const [field, , { setValue }] = useField(name);
  const { errors } = useFormikContext();
  const errorState: FormikErrors<FormValues> = errors;
  const objectLength = Object.keys(errorState).length;
  //waiting for errros from useFormikContext to avoid unnecessary setIconColor(COLORS.checkGreen);
  if (!receivedErrors && objectLength > 0) {
    setReceivedErrors(true);
  }
  useEffect(() => {
    if (receivedErrors) {
      if (
        (email && errorState.email) ||
        (passwordConfirmation && errorState.passwordConfirmation) ||
        (password && errorState.password) ||
        (firstname && errorState.firstname) ||
        (lastname && errorState.lastname)
      ) {
        setIconColor(COLORS.opacity06);
      } else {
        setIconColor(COLORS.checkGreen);
      }
    }
  }, [errorState]);

  return (
    <InputContainer>
      <InputField>
        <FontAwesome
          name={
            name === 'passwordConfirmation' || name === 'password'
              ? 'lock'
              : 'user-o'
          }
          color={theme.mode === 'dark' ? COLORS.white : COLORS.black}
          size={20}
        />
        <MyInput
          {...props}
          value={field.value}
          onChangeText={value => setValue(value)}
        />
      </InputField>
      <Feather name="check-circle" color={iconColor} size={20} />
    </InputContainer>
  );
};

Input.displayName = 'Input';

const InputField = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1.5px;
  border-bottom-color: ${({ theme }) => theme.colors.borderBottomLight};
  margin-bottom: 10px;
  flex: 1;
  max-height: 60px;
`;

export default Input;
