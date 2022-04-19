import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is incorrect!')
    .required('Email is required!'),
  password: yup.string().min(12).required('Password is required!'),
});

export default validationSchema;
