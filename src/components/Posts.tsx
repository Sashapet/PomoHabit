import React, { memo, useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { COLORS } from '../assets/theme';
import { actions, selectors } from '../state';
import Post from './Post';

const Posts = memo(() => {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.posts.posts);
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const canBeUpdated = useSelector(selectors.posts.canBeUpdated);
  const returnResponder = useCallback(() => true, []);
  const handleLoadMore = useCallback(() => {
    if (canBeUpdated && !setOnSync.loading) {
      dispatch(actions.posts.loadNewPosts());
    }
  }, [canBeUpdated, setOnSync]);
  const renderHeaderLoader = useCallback(
    () =>
      setOnSync.type === 'fetchPosts' && setOnSync.loading ? (
        <LoadingContainer>
          <ActivityIndicator animating size="large" color={COLORS.opacity06} />
        </LoadingContainer>
      ) : null,
    [setOnSync],
  );
  const renderFooterLoader = useCallback(
    () =>
      setOnSync.type === 'loadNewPosts' && setOnSync.loading ? (
        <LoadingContainer>
          <ActivityIndicator animating size="large" color={COLORS.opacity06} />
        </LoadingContainer>
      ) : null,
    [setOnSync],
  );
  const handleRefresh = useCallback(() => {
    dispatch(actions.posts.refresh());
  }, []);

  return (
    <ScrollResponderContainer onStartShouldSetResponder={returnResponder}>
      <FlatList
        style={styles.flatList}
        data={posts}
        keyExtractor={item => item.postId}
        renderItem={({ item }) => {
          const postObj = {
            ...item,
          };
          return <Post post={postObj} />;
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListHeaderComponent={renderHeaderLoader}
        ListFooterComponent={renderFooterLoader}
        refreshing={
          setOnSync.type === 'refresh' && setOnSync.loading ? true : false
        }
        onRefresh={handleRefresh}
      />
    </ScrollResponderContainer>
  );
});
Posts.displayName = 'Posts';
const ScrollResponderContainer = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-self: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.paleWhite};
`;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginBottom: 70,
  },
});

export default Posts;
