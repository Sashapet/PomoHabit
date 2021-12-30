import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { wWidth } from '../../utils/helpers/helpers';
import { RoundedButton } from '../../components/styled/Buttons/FormButtons';
import { ROUTES } from '../../routes/RouteNames';

interface WelcomeViewProps {
  setShowWelcome: (target: boolean) => void;
}
const width = wWidth * 0.5;
const height = width * (139 / 216);

const WelcomeView: React.FC<WelcomeViewProps> = memo(({ setShowWelcome }) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const navigateLogin = useCallback(() => {
    navigate(ROUTES.Login);
    setShowWelcome(false);
  }, []);

  useEffect(() => {
    console.tron.log('render');
  }, []);

  return (
    <WelcomeContainer>
      <WelcomeImage
        imgW={width + 'px'}
        imgH={height + 'px'}
        source={require('../../assets/images/logo.png')}
      />
      <WelcomeText>PomoHabit</WelcomeText>
      <ButtonContainer>
        <RoundedButton onPress={navigateLogin}>
          {t('Buttons:getStarted')}
        </RoundedButton>
      </ButtonContainer>
    </WelcomeContainer>
  );
});

const ButtonContainer = styled.View`
  margin-top: 10px;
  height: 80px;
  width: 150px;
`;
const WelcomeContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WelcomeImage = styled.Image<{ imgW: string; imgH: string }>`
  width: ${({ imgW }) => imgW && imgW};
  height: ${({ imgH }) => imgH && imgH};
`;
const WelcomeText = styled.Text`
  font-size: 35px;
  font-family: ${({ theme }) => theme.fonts.NunitoBold};
  color: ${({ theme }) => theme.colors.white};
`;
WelcomeView.displayName = 'WelcomeView';
export default WelcomeView;
