import * as Yup from 'yup';



const SiginupSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
    .email('Please enter a valid email address')
    .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        'Invalid email format. Please use a valid email address.'
    )
    .required('Email is required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special symbol'
    )
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  });
 
  export default SiginupSchema