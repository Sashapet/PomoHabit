import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import { selectors } from '../../state';
import Contact from '../../components/Contact';
import SearchForm from '../../components/Formik/SearchForm';
import { COLORS } from '../../assets/theme';

const SearchView = memo(() => {
  const contacts = useSelector(selectors.search.contacts);
  const userId = useSelector(selectors.auth.userId);

  return (
    <SearchContainer>
      <SearchForm />
      <FlatList
        style={styles.flastList}
        data={contacts}
        keyExtractor={item => item.userId}
        renderItem={({ item }) =>
          item.userId !== userId && (
            <Contact
              sort_name={item.sort_name}
              userId={item.userId}
              lastname={item.lastname}
              firstname={item.firstname}
              avatar={item.avatar}
            />
          )
        }
      />
    </SearchContainer>
  );
});

const styles = StyleSheet.create({
  flastList: {
    backgroundColor: COLORS.white,
    marginBottom: 70,
    width: '100%',
  },
});

const SearchContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.paleWhite};
`;

SearchView.displayName = 'SearchView';
export default SearchView;
