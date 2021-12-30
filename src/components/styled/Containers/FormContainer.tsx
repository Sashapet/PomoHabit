import React, { memo } from 'react';
import styled from 'styled-components/native';

const FlexCenter = styled.View`
  flex: 1;
  align-items: center;
`;
const JustifyCenter = styled.View`
  flex: 1;
  justify-content: center;
  width: 80%;
`;
export const FlexEnd = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
export const Flex4 = styled.View`
  flex: 4;
`;
export const FormContainer = memo(({ children }) => (
  <FlexCenter>
    <JustifyCenter>{children}</JustifyCenter>
  </FlexCenter>
));

FormContainer.displayName = 'FormContainer';
