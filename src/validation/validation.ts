import * as yup from 'yup';

const letterRegex = /^[aA-zZ\s]+$/;

const loginSchema = yup.object().shape({
  email: yup.string().email('emailValid').required('emailReq'),
  password: yup
    .string()
    .min(6, 'password6')
    .max(20, 'password20')
    .required('passwordReq'),
});

const registerSchema = yup.object().shape({
  firstname: yup
    .string()
    .max(15, 'firstNameMax')
    .required('firstNameReq')
    .matches(letterRegex, 'firstNameAplhabets')
    .transform((value, originalValue) =>
      /\s/.test(originalValue) ? NaN : value,
    ),
  lastname: yup
    .string()
    .max(15, 'lastNameMax')
    .required('lastNameReq')
    .transform((value, originalValue) =>
      /\s/.test(originalValue) ? NaN : value,
    )
    .matches(letterRegex, 'lastNameAplhabets'),
  email: yup.string().email('emailValid').required('emailReq'),
  password: yup
    .string()
    .min(6, 'password6')
    .max(20, 'password20')
    .required('passwordReq'),
  passwordConfirmation: yup
    .string()
    .required('confirmReq')
    .oneOf([yup.ref('password'), null], 'passwordMatch'),
});
const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('emailValid').required('emailReq'),
});

const taskSchema = yup.object().shape({
  title: yup.string().required('titleReq'),
});

const updateUserName = yup.object().shape({
  firstname: yup.string().max(15).required('titleReq'),
  lastname: yup.string().max(15).required('titleReq'),
});

export const validations = {
  login: loginSchema,
  register: registerSchema,
  forgot: forgotPasswordSchema,
  task: taskSchema,
  updateUserName: updateUserName,
};
