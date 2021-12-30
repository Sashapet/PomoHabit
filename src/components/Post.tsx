import React, { memo, useMemo } from 'react';
import styled from 'styled-components/native';
import { default as CommentIcon } from 'react-native-vector-icons/MaterialCommunityIcons';

import Like from './Like';
import { renderPostTime } from '../utils/helpers/timeHelpers';
import { PostProps } from '../types/postTypes';
import { COLORS } from '../assets/theme';
import {
  BorderBottomBlock,
  BorderRightBlock,
  Type,
  Value,
} from '../containers/RecordFlow/FinishView';

const arePropsEqual = (
  prevProps: { post: PostProps },
  nextProps: { post: PostProps },
) => {
  if (prevProps.post.postId !== nextProps.post.postId) return false;
  return true;
};

const Post: React.FC<{ post: PostProps }> = memo(({ post }) => {
  const time = useMemo(() => renderPostTime(post.createdAt), [post.createdAt]);

  return (
    <PostsWhiteContainer>
      <PostsContainer>
        <Profile>
          <Img source={{ uri: post.user.avatar }} />
          <PostInfo>
            <Name>
              {post.user.firstname} {post.user.lastname}
            </Name>
            <Time>{time}</Time>
          </PostInfo>
        </Profile>
        <TextContainer>
          <Title>{post.title}</Title>
          <Description>{post.description}</Description>
        </TextContainer>
        <Results>
          <BorderRightBlock>
            <Type>Working Style</Type>
            <Value>{post.style}</Value>
          </BorderRightBlock>
          <BorderRightBlock>
            <Type>Sessions Done</Type>
            <Value>{post.sessions}</Value>
          </BorderRightBlock>
          <BorderBottomBlock>
            <Type>Working Time</Type>
            <Value>{post.time}</Value>
          </BorderBottomBlock>
        </Results>
        <SocialContainer>
          <SocialData>{post.likeCount} likes</SocialData>
          <SocialData>20 comments</SocialData>
        </SocialContainer>
        <SocialOptions>
          <Like postId={post.postId} />
          <Option>
            <CommentIcon
              name="comment-outline"
              size={25}
              color={COLORS.opacity06}
            />
            <OptionText>Comment</OptionText>
          </Option>
        </SocialOptions>
      </PostsContainer>
    </PostsWhiteContainer>
  );
}, arePropsEqual);
Post.displayName = 'Post';
const OptionText = styled.Text`
  padding-left: 4px;
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  color: ${({ theme }) => theme.colors.opacity06};
`;

const Option = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SocialOptions = styled.View`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SocialData = styled.Text`
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.NunitoSemiBold};
  color: ${({ theme }) => theme.colors.opacity06};
`;

const SocialContainer = styled.View`
  padding-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.NunitoSemiBold};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyish};
`;

const Results = styled.View`
  flex-direction: row;
  height: 60px;
`;
const TextContainer = styled.View`
  width: 70%;
  padding-vertical: 10px;
`;
const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  font-size: 18px;
`;
const PostInfo = styled.View`
  padding-left: 15px;
`;
const Time = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.NunitoSemiBold};
  color: ${({ theme }) => theme.colors.opacity06};
`;
const Name = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  color: ${({ theme }) => theme.colors.black};
`;
const Img = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 100px;
`;

const Profile = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostsWhiteContainer = styled.View`
  padding-vertical: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 12px;
`;
const PostsContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`;

export default Post;
