import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import LoginSchema from '../../components/validationSchema/LoginShema';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Contextstore from '../../context/Data/StoreContext';
function Login() {
    const { Loading, setLoading,getUserCartData } = useContext(Contextstore)
    const navigate= useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const admin = JSON.parse(localStorage.getItem('user'))

if(admin?.user?.uid){
 return  <Navigate to="/" />
}







    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values, { resetForm }) => {
            // Handle form submission here
            signin(values,resetForm)
            // You can make API calls, etc.
        },
    })
    const signin = async (value,resetForm) => {
        setLoading(true);
        try {
          const result = await signInWithEmailAndPassword(auth, value?.email, value?.password)
          localStorage.setItem('user',JSON.stringify(result));
          toast.success('Signin Successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          getUserCartData()
          navigate("/")
          setLoading(false);
          resetForm()
        } catch (error) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }
      }
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }
    const backgroundImageUrl = 'https://media.istockphoto.com/id/494354422/sv/vektor/vector-seamless-shopping-pattern-background.jpg?s=1024x1024&w=is&k=20&c=pyWyKmH-Ws3XF4YP23f5UnHOQ8Z3gDL0AInTMpj8G_A=';
    return (
        <form onSubmit={formik.handleSubmit}>
          <div className='flex justify-center items-center h-screen bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            className={`${formik.touched.email && formik.errors.email
                                    ? 'border-red-500'
                                    : 'border-gray-600'
                                } bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none`}
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm relative bottom-3 w-full ">
                                {formik.errors.email}
                            </div>
                        ) : null}

                    </div>
                    <div>
                        <input
                            type={showPassword ? "text":"password"}
                            name="password"
                            className={`${formik.touched.password && formik.errors.password
                                    ? 'border-red-500'
                                    : 'border-gray-600'
                                } bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none`}
                            placeholder="Enter Password"
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
                            <div className='text-red-500 text-sm  relative bottom-3 w-60'>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className=' flex justify-center mb-3 w-full'>

                        <PrimaryButton btnText='Signup' showLoading={Loading} disabled={Loading}
                            className='bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg' onClick={formik.handleSubmit} />
                    </div>
                    <div>
                        <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login