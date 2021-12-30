import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '../../components/Formik/Form';
import { FormHeader } from '../../components/styled/Text/FormText';
import { authAction } from '../../state/actions';
import { validations } from '../../validation/validation';
import {
  Flex4,
  FlexEnd,
  FormContainer,
} from '../../components/styled/Containers/FormContainer';

const LoginView = memo(() => {
  const { t } = useTranslation();
  return (
    <FormContainer>
      <FlexEnd>
        <FormHeader>{t('titles:signIn')}</FormHeader>
      </FlexEnd>
      <Flex4>
        <Form login action={authAction.login} schema={validations.login} />
      </Flex4>
    </FormContainer>
  );
});

LoginView.displayName = 'LoginView';
export default LoginView;
