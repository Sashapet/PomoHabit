import React, { useCallback, useEffect, useState } from 'react';
import { default as LikeIcon } from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { COLORS } from '../assets/theme';
import { actions, selectors } from '../state';

const Like: React.FC<{ postId: string }> = ({ postId }) => {
  const [likedPost, setLikedPost] = useState(false);
  const dispatch = useDispatch();
  const likedPosts = useSelector(selectors.posts.likedPosts);
  const handleLike = useCallback(() => {
    if (!likedPost) {
      dispatch(actions.posts.like(postId));
    }
  }, [likedPost]);

  useEffect(() => {
    dispatch(actions.posts.checkIfLiked(postId));
  }, []);

  useEffect(() => {
    const findIfLiked = likedPosts.find(post => post === postId);
    if (findIfLiked) {
      setLikedPost(true);
    } else {
      setLikedPost(false);
    }
  }, [likedPosts]);

  return (
    <Option onPress={handleLike}>
      <LikeIcon
        name="like2"
        size={25}
        color={likedPost ? COLORS.secondary : COLORS.opacity06}
      />
      <OptionText color={likedPost ? COLORS.secondary : COLORS.opacity06}>
        Like
      </OptionText>
    </Option>
  );
};

const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const OptionText = styled.Text<{ color: string }>`
  padding-left: 4px;
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  color: ${({ color }) => color};
`;
export default Like;
