import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import { wWidth } from '../utils/helpers/helpers';
import { actions, selectors } from '../state';
import { darkTheme, lightTheme } from '../assets/theme/theme';
import { locale } from '../utils/locale';
import { COLORS } from '../assets/theme/colors';

interface IToggleProps {
  language?: boolean;
  themeToggle?: boolean;
}

const Toggle: React.FC<IToggleProps> = memo(({ language, themeToggle }) => {
  const [switchOn, setSwitch] = useState(false);
  const theme = useSelector(selectors.theme.theme);
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const dispatch = useDispatch();

  useEffect(() => {
    themeToggle && (theme.mode === 'dark' ? setSwitch(true) : setSwitch(false));
    language && locale.changeLanguage(locale.language === 'en' ? 'en' : 'lt');
  }, []);
  return (
    <ToggleSwitch
      disabled={setOnSync.loading}
      isOn={switchOn}
      onColor={COLORS.opacity06}
      offColor={COLORS.opacity03}
      thumbOnStyle={{ backgroundColor: theme.PRIMARY_BUTTON_COLOR }}
      thumbOffStyle={{ backgroundColor: theme.PRIMARY_BUTTON_COLOR }}
      icon={
        themeToggle ? (
          <FontAwesome
            name={switchOn ? 'moon-o' : 'sun-o'}
            color={switchOn ? COLORS.sunnyYellow : COLORS.black}
            size={wWidth < 350 ? 17 : 30}
          />
        ) : (
          <ToggleText wWidth={wWidth}>{locale.language}</ToggleText>
        )
      }
      size={wWidth < 350 ? 'medium' : 'large'}
      onToggle={(newState: boolean) => {
        setSwitch(newState);
        language &&
          locale.changeLanguage(locale.language === 'en' ? 'lt' : 'en');
        themeToggle &&
          dispatch(
            actions.theme.switchTheme(
              theme.mode === 'dark' ? lightTheme : darkTheme,
            ),
          );
      }}
    />
  );
});

Toggle.displayName = 'Toggle';
const ToggleText = styled.Text<{ wWidth: number }>`
  font-size: ${({ wWidth }) => (wWidth < 350 ? '12px' : '20px')};
  color: ${({ theme }) => theme.TOGGLE_TEXT_COLOR};
  text-transform: uppercase;
`;
export default Toggle;
