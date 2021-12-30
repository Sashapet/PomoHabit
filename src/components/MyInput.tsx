import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { COLORS, FONTS } from '../assets/theme';
import { InputProps } from './TextField';

const Input: React.FC<InputProps> = props => {
  const { name } = props;
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={
        name === 'title' ? COLORS.black : COLORS.placeholderColor
      }
      underlineColorAndroid="transparent"
      secureTextEntry={
        (name === 'passwordConfirmation' || name === 'password') && true
      }
    />
  );
};
const styles = StyleSheet.create({
  input: {
    color: COLORS.white,
    flex: 1,
    fontFamily: FONTS.NunitoSemiBold,
    fontSize: 17,
  },
});

export default Input;
