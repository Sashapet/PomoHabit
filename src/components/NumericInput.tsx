import React, { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { selectors } from '../state';
import {
  LeftNumericButton,
  RightNumericButton,
} from './styled/Buttons/NumericButton';

const NumericInput: React.FC<{
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
}> = memo(({ number, setNumber }) => {
  const setOnSync = useSelector(selectors.theme.setOnSync);
  const handleAdd = useCallback(() => {
    setNumber(prevState => {
      if (prevState < 60) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
  }, []);

  const handleSub = useCallback(() => {
    setNumber(prevState => {
      if (prevState > 1) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  }, []);

  return (
    <NumericContainer>
      <LeftNumericButton disabled={setOnSync.loading} onPress={handleSub}>
        -
      </LeftNumericButton>
      <NumberContainer>
        <Number>{number}</Number>
      </NumberContainer>
      <RightNumericButton disabled={setOnSync.loading} onPress={handleAdd}>
        +
      </RightNumericButton>
    </NumericContainer>
  );
});
const NumberContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1.5;

  border: 1px solid ${({ theme }) => theme.colors.opacity01};
`;
const Number = styled.Text`
  font-size: 17px;
  font-family: ${({ theme }) => theme.fonts.MontserratRegular};
`;

const NumericContainer = styled.View`
  width: 64%;
  height: 50px;
  flex-direction: row;
`;
NumericInput.displayName = 'NumericInput';
export default NumericInput;
