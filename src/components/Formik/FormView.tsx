import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormikContext } from 'formik';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';

import { ROUTES } from '../../routes/RouteNames';
import {
  chooseButtonTitle,
  chooseErrorTitle,
} from '../../utils/helpers/helpers';
import { GoBackText, UnderlinedText } from '../styled/Text/FormText';
import Error from '../Error';
import { selectors } from '../../state';
import TextField from '../TextField';
import { BorderButton, RoundedButton } from '../styled/Buttons/FormButtons';

interface FormViewProps {
  register: boolean;
  login: boolean;
}

const FormView: React.FC<FormViewProps> = memo(({ register, login }) => {
  const { t } = useTranslation();

  const setOnSync = useSelector(selectors.theme.setOnSync);
  //ERRORS
  const { handleSubmit, setTouched, setValues, errors } = useFormikContext();
  const { navigate, goBack } = useNavigation();
  const [errorTitle, setError] = useState('');
  const navigateToRegister = useCallback(() => navigate(ROUTES.Register), []);
  const navigateToForgot = useCallback(
    () => navigate(ROUTES.ForgotPassword),
    [],
  );
  const submit = useCallback(() => {
    setError(chooseErrorTitle(errors));
    handleSubmit();
    Keyboard.dismiss();
  }, [errors]);

  // CLEANUP FORM ON FOCUS
  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      return () => {
        if (mounted) {
          setTouched({ field: true });
          setValues({ field: '' });
          setError('');
        }
        mounted = false;
      };
    }, []),
  );

  return (
    <>
      <Error errorTitle={errorTitle} />
      {register && (
        <>
          <TextField
            name={'firstname'}
            placeholder={t('common:firstname')}
            firstname={true}
          />
          <TextField
            name={'lastname'}
            placeholder={t('common:lastname')}
            lastname={true}
          />
        </>
      )}
      <TextField name={'email'} placeholder={t('common:email')} email={true} />
      {(register || login) && (
        <TextField
          name={'password'}
          password={true}
          placeholder={t('common:password')}
        />
      )}
      {login && (
        <UnderlinedText disabled={setOnSync.loading} onPress={navigateToForgot}>
          {t('Buttons:forgotPassword')}
        </UnderlinedText>
      )}
      {register && (
        <TextField
          name={'passwordConfirmation'}
          passwordConfirmation={true}
          placeholder={t('common:confirmPassword')}
        />
      )}
      <ButtonContainer>
        <RoundedButton
          onPress={submit}
          disabled={setOnSync.loading}
          loading={setOnSync.loading}
        >
          {t('Buttons:' + chooseButtonTitle(register, login))}
        </RoundedButton>
      </ButtonContainer>
      {login && (
        <BorderButton disabled={setOnSync.loading} onPress={navigateToRegister}>
          {t('Buttons:SIGNUP')}
        </BorderButton>
      )}
      {register && (
        <GoBackText disabled={setOnSync.loading} onPress={goBack}>
          {t('Buttons:alreadyHave')}
        </GoBackText>
      )}
    </>
  );
});

const ButtonContainer = styled.View`
  margin-bottom: 10px;
  height: 70px;
`;

FormView.displayName = 'FormView';
export default FormView;
