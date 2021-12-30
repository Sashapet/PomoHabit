import React, { memo } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import FormView from './FormView';

interface IFormProps {
  register?: boolean;
  login?: boolean;
  schema: yup.AnyObjectSchema;
  action: (event: unknown) => void;
}

const Form: React.FC<IFormProps> = memo(
  ({ action, register, login, schema }) => {
    const dispatch = useDispatch();

    const initialValues = {
      firstname: '',
      lastname: '',
      email: '',
      passwordConfirmation: '',
      password: '',
    };
    const initialTouched = {
      firstname: true,
      lastname: true,
      email: true,
      passwordConfirmation: true,
      password: true,
    };

    return (
      <Formik
        initialValues={initialValues}
        initialTouched={initialTouched}
        validateOnMount
        onSubmit={async data => {
          await dispatch(action(data));
        }}
        validationSchema={schema}
      >
        {() => <FormView register={register} login={login} />}
      </Formik>
    );
  },
);

Form.displayName = 'Form';
export default Form;
