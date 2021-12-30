import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

interface IErrorProps {
  errorTitle: string;
}

const Error: React.FC<IErrorProps> = memo(({ errorTitle }) => {
  const { t } = useTranslation();
  return (
    errorTitle.length > 0 && (
      <ErrorContainer>
        <ErrorText>{t('errors:' + errorTitle)}</ErrorText>
      </ErrorContainer>
    )
  );
});

const ErrorContainer = styled.View`
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.opacity06};
`;

const ErrorText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.MontserratBold};
  padding-left: 15px;
`;

Error.displayName = 'Error';
export default Error;
