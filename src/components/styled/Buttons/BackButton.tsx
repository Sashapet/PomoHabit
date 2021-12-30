import { useNavigation } from '@react-navigation/native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { selectors } from '../../../state';
import { COLORS } from '../../../assets/theme';

const BackButton: React.FC<{ home?: boolean }> = () => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const { goBack } = useNavigation();

  return (
    <AbsoluteContainer pointerEvents={setOnSync.loading ? 'none' : 'auto'}>
      <FontAwesome
        onPress={goBack}
        name="angle-left"
        color={COLORS.white}
        size={35}
      />
    </AbsoluteContainer>
  );
};

const AbsoluteContainer = styled.View`
  position: absolute;
  flex-direction: row;
  right: 92%;
  top: 5%;
`;
export default BackButton;
