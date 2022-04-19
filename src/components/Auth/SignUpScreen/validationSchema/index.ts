import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is incorrect!')
    .required('Email is required!'),
  name: yup
    .string()
    .matches(
      /^[A-ZА-ЯЁ]\S+(\s[A-ZА-ЯЁ]\S+)+$/,
      'Name must be 2+ words, each of which must be capitalized!',
    )
    .required('Name is required!'),
  password: yup.string().min(12).required('Password is required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords are not the same!')
    .required('Confirm password is required!'),
});

export default validationSchema;
