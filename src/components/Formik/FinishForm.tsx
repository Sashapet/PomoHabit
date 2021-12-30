import React, { memo, useCallback, useEffect } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components/native';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS } from '../../assets/theme';
import { DeleteButton as DiscardButton } from '../styled/Buttons/TaskFormButtons';
import { actions, selectors } from '../../state';
import { RoundedButton } from '../styled/Buttons/FormButtons';

interface PostDataProps {
  style: string;
  sessions: number;
  time: string;
}

const FinishForm: React.FC<{
  postData: PostDataProps;
  handlePopUp: React.Dispatch<React.SetStateAction<boolean>>;
}> = memo(({ postData, handlePopUp }) => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const posted = useSelector(selectors.pomodoro.posted);
  //POST DATA
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    description: '',
  };
  //HANDLE NAVIGATING AFTER SUCCESSFUL POST
  useEffect(() => {
    if (posted) {
      navigation.goBack();
      dispatch(actions.pomodoro.setPosted(false));
    }
  }, [posted]);

  const handleDiscard = useCallback(() => {
    //OPEN POP UP
    handlePopUp(true);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async data => {
        Keyboard.dismiss();
        await dispatch(
          actions.pomodoro.post({
            ...postData,
            title: data.name,
            description: data.description,
          }),
        );
      }}
    >
      {({ handleSubmit, values, handleChange }) => (
        <>
          <FormContainer>
            <InputContainer>
              <Label>Name</Label>
              <TextInput
                style={styles.input}
                placeholder={'Title your work'}
                placeholderTextColor={COLORS.opacity04}
                underlineColorAndroid="transparent"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              <Label>Description</Label>
              <TextInput
                style={styles.input}
                placeholder={'How did it go?'}
                placeholderTextColor={COLORS.opacity04}
                underlineColorAndroid="transparent"
                value={values.description}
                onChangeText={handleChange('description')}
              />
              <ButtonContainer>
                <RoundedButton
                  loading={setOnSync.loading}
                  disabled={setOnSync.loading}
                  onPress={handleSubmit}
                >
                  POST ACTIVITY
                </RoundedButton>
              </ButtonContainer>
            </InputContainer>
            <DiscardContainer>
              <DiscardButton
                disabled={setOnSync.loading}
                onPress={handleDiscard}
              >
                Discard Activity
              </DiscardButton>
            </DiscardContainer>
          </FormContainer>
        </>
      )}
    </Formik>
  );
});
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
const DiscardContainer = styled.View`
  position: absolute;
  bottom: 0;
  align-self: center;
  padding-bottom: 40px;
`;
const ButtonContainer = styled.View`
  height: 70px;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MontserratRegular};
  font-size: 15px;
  padding-top: 10px;
`;

const InputContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const FormContainer = styled.View`
  flex: 1;
  width: 100%;
`;

FinishForm.displayName = 'TaskForm';
export default FinishForm;
