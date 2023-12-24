import { Link, Navigate } from 'react-router-dom';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useFormik } from 'formik';
import SiginupSchema from '../../components/validationSchema/SiginupShema';
import { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Contextstore from '../../context/Data/StoreContext';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';


function Signup() {
    const { Loading, setLoading } = useContext(Contextstore)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SiginupSchema,
        onSubmit: (values, { resetForm }) => {
            // Handle form submission here
            signup(values, resetForm)
            // You can make API calls, etc.
        },
    });
    const admin = JSON.parse(localStorage.getItem('user'))

    if(admin?.user?.uid){
        return  <Navigate to="/" />
       }
    const signup = async (value, resetForm) => {
        setLoading(true)


        try {
            const users = await createUserWithEmailAndPassword(auth, value?.email, value?.password);


            const user = {
                name: value?.name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now(),

            }
            const userRef = collection(fireDB, "users")
            const res = await addDoc(userRef, user);
            console.log(res)
            toast.success("Signup Succesfully", {
                style: {
                    background: "back"
                }
            })

            setLoading(false)
            resetForm()

        } catch (error) {
            setLoading(false)
            toast.error(error?.message)
            resetForm()
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const [confirmshowPassword, setconfirmshowPassword] = useState(false);



    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleconfirmPassword = () => {
        setconfirmshowPassword(!confirmshowPassword);
    };
    const backgroundImageUrl = 'https://media.istockphoto.com/id/494354422/sv/vektor/vector-seamless-shopping-pattern-background.jpg?s=1024x1024&w=is&k=20&c=pyWyKmH-Ws3XF4YP23f5UnHOQ8Z3gDL0AInTMpj8G_A=';
    return (
        <form onSubmit={formik.handleSubmit}>
  <div className='flex justify-center items-center h-screen bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="name"
                            className={`${formik.touched.name && formik.errors.name
                                ? 'border-red-500'
                                : 'border-gray-600'
                                } bg-gray-600 mb-4  px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none`}
                            placeholder='Enter the name'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className='text-red-500 text-sm  relative bottom-3'>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            type="email"
                            name='email'
                            className={`${formik.touched.email && formik.errors.email
                                ? 'border-red-500'
                                : 'border-gray-600'
                                } bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none`}
                            placeholder='Email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-red-500 text-sm  relative bottom-3'>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            type={showPassword ? 'text' : 'password'}

                            name='password'
                            className={`${formik.touched.password && formik.errors.password
                                ? 'border-red-500'
                                : 'border-gray-600'
                                }  bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none`}
                            placeholder='Password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <div
                            className='float-right relative lg:top-3 bottom-11 right-8 lg:top-12  cursor-pointer'
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-red-500 text-sm  w-60 relative bottom-3 w-full lg:w-[20em]'>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            type={confirmshowPassword ? 'text' : 'password'}
                            name='confirmPassword'
                            className={`${formik.touched.confirmPassword && formik.errors.confirmPassword
                                ? 'border-red-500'
                                : 'border-gray-600'
                                } bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none`}
                            placeholder='Confirm Password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        <div
                            className='float-right relative bottom-11 right-8 lg:top-3 cursor-pointer'
                            onClick={handleToggleconfirmPassword}
                        >
                            {confirmshowPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>


                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className='text-red-500 text-sm relative bottom-3'>
                                {formik.errors.confirmPassword}
                            </div>
                        ) : null}
                    </div>
                    <div className='flex justify-center mb-3 w-full'>
                        <PrimaryButton btnText='Signup' showLoading={Loading} disabled={Loading}
                            className='w-full text-black font-bold  px-2 py-2 rounded-lg' onClick={formik.handleSubmit} />
                    </div>
                    <div>
                        <h2 className='text-white'>
                            Have an account{' '}
                            <Link className='text-red-500 font-bold' to={'/login'}>
                                Login
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Signup;
