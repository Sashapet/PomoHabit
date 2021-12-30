import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '../../components/Formik/Form';
import { FormContainer } from '../../components/styled/Containers/FormContainer';
import { authAction } from '../../state/actions';
import { validations } from '../../validation/validation';
import BackButton from '../../components/styled/Buttons/BackButton';
import { FormHeader } from '../../components/styled/Text/FormText';

const ForgotPasswordView = memo(() => {
  const { t } = useTranslation();
  return (
    <>
      <FormContainer>
        <FormHeader>{t('Buttons:forgotPassword')}</FormHeader>
        <Form action={authAction.recover} schema={validations.forgot} />
      </FormContainer>
      <BackButton home={false} />
    </>
  );
});
ForgotPasswordView.displayName = 'ForgotPasswordView';
export default ForgotPasswordView;
