import * as Yup from 'yup';



const AddProductSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    imageurl: Yup.string().required('Image URL is required').url('Invalid URL format'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
  });
 
  export default AddProductSchema