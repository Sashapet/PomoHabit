import React, { memo } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components/native';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTS } from '../../assets/theme';
import { actions, selectors } from '../../state';
import { RoundedButton } from '../styled/Buttons/FormButtons';

const SearchForm = memo(() => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  //POST DATA

  const dispatch = useDispatch();

  const initialValues = {
    searchText: '',
  };

  return (
    <SearchContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={async data => {
          if (data.searchText.length > 0) {
            let whitespace = false;
            if (!data.searchText.replace(/\s/g, '').length) {
              whitespace = true;
            }
            if (!whitespace) {
              dispatch(actions.search.search(data.searchText.trim()));
            }
          }
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <FormContainer>
            <InputContainer>
              <InputColorContainer>
                <TextInput
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  placeholder={'Search for friends'}
                  placeholderTextColor={COLORS.opacity04}
                  value={values.searchText}
                  onChangeText={handleChange('searchText')}
                />
              </InputColorContainer>
              <ButtonContainer>
                <RoundedButton
                  loading={setOnSync.type === 'search' && setOnSync.loading}
                  disabled={setOnSync.loading}
                  onPress={handleSubmit}
                >
                  SEARCH
                </RoundedButton>
              </ButtonContainer>
            </InputContainer>
          </FormContainer>
        )}
      </Formik>
    </SearchContainer>
  );
});
const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.placeholderColor,
    borderRadius: 7,
    color: COLORS.black,
    fontFamily: FONTS.NunitoSemiBold,
    fontSize: 17,
    paddingHorizontal: 8,
    textDecorationLine: 'none',
    width: '90%',
  },
});

const InputColorContainer = styled.View`
  margin-top: 5px;
  align-items: center;
  justify-content: center;
  height: 65px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const ButtonContainer = styled.View`
  height: 70px;
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
`;

const SearchContainer = styled.View`
  position: relative;
`;

const InputContainer = styled.View`
  width: 100%;
`;

const FormContainer = styled.View`
  width: 100%;
`;

SearchForm.displayName = 'SearchForm';
export default SearchForm;
