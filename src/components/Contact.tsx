import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { actions, selectors } from '../state';
import { ContactProps } from '../state/search/searchReducer';
import { SecondaryBorderButton as FollowButton } from './styled/Buttons/SecondaryBorderBtn';

const arePropsEqual = (prevProps: ContactProps, nextProps: ContactProps) => {
  if (prevProps.userId !== nextProps.userId) return false;
  return true;
};

const Contact: React.FC<ContactProps> = memo(
  ({ avatar, firstname, lastname, userId }) => {
    const dispatch = useDispatch();
    const following = useSelector(selectors.follow.following);
    const followedBy = useSelector(selectors.follow.followedBy);
    const [follow, setFollow] = useState<boolean | string>(false);
    const handleFollow = useCallback(() => {
      dispatch(actions.follow.followUser(userId));
    }, []);
    const handleUnFollow = useCallback(() => {
      dispatch(actions.follow.unfollowUser(userId));
    }, []);

    useEffect(() => {
      const findFollowingUser = following.find(user => user.userId === userId);
      if (findFollowingUser) {
        setFollow('Following');
      } else {
        const findFollowedUser = followedBy.find(
          user => user.userId === userId,
        );
        if (findFollowedUser) {
          setFollow('Follow Back');
        } else {
          setFollow('Follow');
        }
      }
    }, [following]);

    return (
      <ContactContainer>
        <ProfileContainer>
          <NameContainer>
            <ProfileImg source={{ uri: avatar }} />
            <Name>
              {firstname} {lastname}
            </Name>
          </NameContainer>
        </ProfileContainer>
        <ButtonContainer>
          {follow === 'Following' ? (
            <FollowButton onPress={handleUnFollow}>{follow}</FollowButton>
          ) : (
            <FollowButton onPress={handleFollow}>{follow}</FollowButton>
          )}
        </ButtonContainer>
      </ContactContainer>
    );
  },
  arePropsEqual,
);
Contact.displayName = 'Contact';
const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MontserratRegular};

  font-size: 15px;
`;
const ButtonContainer = styled.View`
  width: 90px;
  height: 40px;
`;
const NameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ContactContainer = styled.View`
  height: 70px;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.paleWhite};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.paleWhite};
`;
const ProfileContainer = styled.View`
  flex: 1;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ProfileImg = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  margin-right: 5px;
`;

export default Contact;
