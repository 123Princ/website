import * as Yup from 'yup';
const OrdeNOwSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Pincode must be a 6-digit number'),
    mobileNumber: Yup.string()
    .required('Number is required')
    .matches(/^\d+$/, 'Number must contain only digits')
    .min(10, 'Number must be at least 10 digits')
    .max(12, 'Number cannot exceed 12 digits'),
  });
  export default OrdeNOwSchema 