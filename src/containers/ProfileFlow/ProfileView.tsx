import React, { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import LogOutPopUp from '../../components/PopUps/SecondaryPupUp';
import {
  countFollowers,
  countFollowing,
  wWidth,
} from '../../utils/helpers/helpers';
import EditProfilePupUp from '../../components/PopUps/EditProfilePopUp';
import { SecondaryBorderButton } from '../../components/styled/Buttons/SecondaryBorderBtn';
import { selectors } from '../../state';

const ImageSize = wWidth * 0.25;

const ProfileView = memo(() => {
  const [show, setShow] = useState(false);
  const following = useSelector(selectors.follow.following);
  const followedBy = useSelector(selectors.follow.followedBy);
  const logOutModal = useSelector(selectors.auth.logOutModal);
  const followers = useMemo(() => countFollowers(followedBy), [followedBy]);
  const follows = useMemo(() => countFollowing(following), [following]);

  const closePupUp = useCallback(() => {
    setShow(false);
  }, []);
  const openPopUp = useCallback(() => {
    setShow(true);
  }, []);
  const userInfo = useSelector(selectors.auth.userInfo);

  return (
    <ProfileContainer>
      <WidthContainer>
        <Profile>
          <ImageContainer>
            <ProfileImage source={{ uri: userInfo.avatar }} size={ImageSize} />
          </ImageContainer>
          <UserData>
            <Count>
              <DataText>19</DataText>
              <DataText>Posts</DataText>
            </Count>
            <Count>
              <DataText>{followers}</DataText>
              <DataText>Followers</DataText>
            </Count>
            <Count>
              <DataText>{follows}</DataText>
              <DataText>Following</DataText>
            </Count>
          </UserData>
        </Profile>
        <Name>
          {userInfo.firstname} {userInfo.lastname}
        </Name>
        <ButtonContainer>
          <SecondaryBorderButton onPress={openPopUp}>
            Edit Profile
          </SecondaryBorderButton>
        </ButtonContainer>
      </WidthContainer>
      <EditProfilePupUp show={show} closePopUp={closePupUp} />
      <LogOutPopUp show={logOutModal} logOut={true} />
    </ProfileContainer>
  );
});

const ButtonContainer = styled.View`
  height: 50px;
  margin-vertical: 10px;
`;
const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MontserratBold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 15px;
`;
const DataText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 15px;
`;
const Count = styled.View`
  align-items: center;
`;
const UserData = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
`;
const ProfileImage = styled.Image<{ size: number }>`
  border-radius: 100px;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
`;
const ImageContainer = styled.View`
  position: relative;
`;
const Profile = styled.View`
  flex-direction: row;
  align-items: center;
`;
const WidthContainer = styled.View`
  padding-top: 5%;
  width: 90%;
  margin: 0 auto;
`;
const ProfileContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.paleWhite};
`;
ProfileView.displayName = 'ProfileView';

export default ProfileView;
