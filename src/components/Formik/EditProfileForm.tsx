import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { default as PlusIcon } from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker/src/index';

import { wWidth } from '../../utils/helpers/helpers';
import { validations } from '../../validation/validation';
import { RoundedButton } from '../styled/Buttons/FormButtons';
import { COLORS, FONTS } from '../../assets/theme';
import { actions, selectors } from '../../state';

const ImageSize = wWidth * 0.4;

const EditProfileForm: React.FC = memo(() => {
  const dispatch = useDispatch();
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const userInfo = useSelector(selectors.auth.userInfo);
  const [imageError, setImageError] = useState('');

  const handlePickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        maxWidth: 800,
        maxHeight: 600,
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          setImageError(response.errorMessage);
        }
        dispatch(actions.auth.uploadImage(response.uri));
      },
    );
  };
  const initialValues = {
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async data => {
        dispatch(actions.auth.updateUserName(data));
      }}
      validationSchema={validations.updateUserName}
    >
      {({ handleSubmit, values, handleChange }) => (
        <>
          <FormContainer>
            <ImageContainer size={ImageSize} onPress={handlePickImage}>
              {setOnSync.type === 'imageUpload' && setOnSync.loading ? (
                <ActivityIndicator
                  animating
                  size="large"
                  color={COLORS.opacity06}
                />
              ) : (
                <>
                  <ProfileImage
                    source={{ uri: userInfo.avatar }}
                    size={ImageSize}
                  />
                  <ContainerAbsolute>
                    <PlusIcon
                      color={COLORS.secondary}
                      size={25}
                      name="pluscircle"
                    />
                  </ContainerAbsolute>
                </>
              )}
            </ImageContainer>
            <TextInput
              style={styles.input}
              placeholder={'First name'}
              placeholderTextColor={COLORS.black}
              underlineColorAndroid="transparent"
              value={values.firstname}
              onChangeText={handleChange('firstname')}
            />
            <TextInput
              style={styles.input}
              placeholder={'Last name'}
              placeholderTextColor={COLORS.black}
              underlineColorAndroid="transparent"
              value={values.lastname}
              onChangeText={handleChange('lastname')}
            />
            <ButtonContainer>
              <RoundedButton
                onPress={handleSubmit}
                disabled={setOnSync.loading}
                loading={
                  setOnSync.type === 'updateUserName' && setOnSync.loading
                }
              >
                Update
              </RoundedButton>
            </ButtonContainer>
            <ImageError>{imageError}</ImageError>
          </FormContainer>
        </>
      )}
    </Formik>
  );
});
const ImageError = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MontserratRegular};
  color: ${({ theme }) => theme.colors.checkRed};
  font-size: 12px;
  align-self: center;
`;
const ContainerAbsolute = styled.View`
  position: absolute;
  bottom: 8px;
  right: 10px;
`;
const ProfileImage = styled.Image<{ size: number }>`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  border-radius: 100px;
`;

interface ImageContainerProps {
  onPress: (event: unknown) => void;
  size: number;
}

const ImageContainer = styled.TouchableOpacity<ImageContainerProps>`
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
`;
const ButtonContainer = styled.View`
  height: 100px;
`;
const FormContainer = styled.View`
  width: 80%;
  margin: 0 auto;
  padding-bottom: 20px;
`;
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

EditProfileForm.displayName = 'TaskForm';
export default EditProfileForm;
