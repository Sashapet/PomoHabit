import { FormikErrors } from 'formik';
import i18n from 'i18next';
import { Dimensions } from 'react-native';

import { FormValues } from '../../types/FormikTypes';

//rand number generator
export const randomNumb = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
//decide button title
export const chooseButtonTitle = (register: boolean, login: boolean) => {
  let button = '';
  if (register) {
    button = i18n.t('Buttons:SIGNUP');
  } else if (login) {
    button = i18n.t('Buttons:SIGNIN');
  } else {
    button = i18n.t('Buttons:resetPassword');
  }
  return button;
};

export const chooseErrorTitle = (errors: FormikErrors<FormValues>) => {
  // ERROR OBJ
  const errorState = {
    email: errors.email ? errors.email : '',
    password: errors.password ? errors.password : '',
    passwordConfirmation: errors.passwordConfirmation
      ? errors.passwordConfirmation
      : '',
    firstname: errors.firstname ? errors.firstname : '',
    lastname: errors.lastname ? errors.lastname : '',
  };
  let error = '';
  if (errorState.firstname) {
    error = errorState.firstname;
  } else if (errorState.lastname) {
    error = errorState.lastname;
  } else if (errorState.email) {
    error = errorState.email;
  } else if (errorState.password) {
    error = errorState.password;
  } else if (errorState.passwordConfirmation) {
    error = errorState.passwordConfirmation;
  }
  return error;
};

//DIMENSIONS
export const { width: wWidth } = Dimensions.get('window');
export const { height: wHeight } = Dimensions.get('window');

export const countTimeDiff = () => {
  const currentDate = +Date.now(); //CURRENT TIME
  const futureDate = +new Date(currentDate + 6 * 60000); //END TIME
  const time = Math.abs(futureDate - currentDate) / 1000; //DIFERENE IN SECONDS
  //MINUTES
  const minutes = Math.floor(time / 60);
  //SECONDS
  const seconds = time - minutes * 60;

  return { seconds, minutes };
};

export const countFollowers = (followers: Array<{ userId: string }>) => {
  let count = 0;
  if (followers?.length > 0) {
    followers.forEach(() => {
      count++;
    });
  }

  return count;
};

export const countFollowing = (following: Array<{ userId: string }>) => {
  let count = 0;
  if (following?.length > 0) {
    following.forEach(() => {
      count++;
    });
  }
  return count;
};
