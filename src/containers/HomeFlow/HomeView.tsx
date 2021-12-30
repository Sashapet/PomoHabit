import React, { memo, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';

import { actions } from '../../state';
import Posts from '../../components/Posts';

const HomeView = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.posts.fetchPosts());
  }, []);

  return (
    <HomeContainer>
      <Posts />
    </HomeContainer>
  );
});
HomeView.displayName = 'HomeView';

const HomeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.paleWhite};
`;

export default HomeView;
