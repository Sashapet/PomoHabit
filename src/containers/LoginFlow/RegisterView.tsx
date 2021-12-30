import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '../../components/Formik/Form';
import { authAction } from '../../state/actions';
import { validations } from '../../validation/validation';
import BackButton from '../../components/styled/Buttons/BackButton';
import {
  Flex4,
  FlexEnd,
  FormContainer,
} from '../../components/styled/Containers/FormContainer';
import { FormHeader } from '../../components/styled/Text/FormText';

const RegisterView = memo(() => {
  const { t } = useTranslation();
  return (
    <>
      <FormContainer>
        <FlexEnd>
          <FormHeader>{t('titles:signUp')}</FormHeader>
        </FlexEnd>
        <Flex4>
          <Form
            register
            action={authAction.register}
            schema={validations.register}
          />
        </Flex4>
      </FormContainer>
      <BackButton />
    </>
  );
});
RegisterView.displayName = 'RegisterView';
export default RegisterView;
