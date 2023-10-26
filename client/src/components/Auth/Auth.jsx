import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../features/authSlice";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

// Auth component render each input field depends on isSignup
// switching between form functionality is implement here
// handleShowPassword got passed down to 2 icons using InputField component
const Auth = () => {
  // show/hide password function
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // sign in/up switching function
  const [isSignup, setIsSignUp] = useState(false);
  const signInUp = () => {
    setIsSignUp((previsSignup) => !previsSignup);
    // clear the current sign in/up form input
    setFormData(initialFormData);
    // reset the showPassword button
    setShowPassword(false);
    setError({ error: false, message: null });
  };

  // handle change form data
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(() => initialFormData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit data wtih Redux Toolkit
  const dispatch = useDispatch();
  const navigate = useNavigate(); // for redirect user to homepage after login
  const [error, setError] = useState({ error: false, message: null }); // for thunk error
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // dispatch sign up action
      dispatch(signUp({ formData, navigate }))
        //handle thunk error from thunkAPI.rejectWithValue
        .unwrap()
        .catch((err) => {
          setError({ error: true, message: err.message });
          console.log("error occurred", err);
        });
    } else {
      // dispatch sign in action
      dispatch(signIn({ formData, navigate }))
        //handle thunk error from thunkAPI.rejectWithValue
        .unwrap()
        .catch((err) => {
          setError({ error: true, message: err.message });
          console.log("error occurred", err);
        });
    }
  };
  return (
    <div className='flex justify-center items-center col-span-3'>
      <div className='p-16 h-full w-1/3 bg-indigo-600 rounded-lg shadow-lg dark:bg-gray-800'>
        {/* form header */}
        <div className='text-center'>
          <h1 className='text-3xl text-white capitalize font-semibold'>
            {isSignup ? "Sign Up" : "Welcome back"}
          </h1>
          <small className='text-gray-400'>
            {isSignup
              ? "Enter your information to register"
              : "Enter your information to log in"}
          </small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 mt-4'>
            {/* first + last name */}
            {isSignup && (
              <div className='flex space-x-2'>
                <InputField
                  name='firstName'
                  label='first name'
                  handleChange={handleChange}
                  value={formData.firstName}
                />
                <InputField
                  name='lastName'
                  label='last name'
                  handleChange={handleChange}
                  value={formData.lastName}
                />
              </div>
            )}

            {/* email */}
            <InputField
              name='email'
              label='email'
              type='email'
              handleChange={handleChange}
              value={formData.email}
            />

            {/* password */}
            <InputField
              name='password'
              label='password'
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
              value={formData.password}
            />

            {/* confirm password */}
            {isSignup && (
              <InputField
                name='confirmPassword'
                label='confirm password'
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                handleChange={handleChange}
                value={formData.confirmPassword}
              />
            )}
            {/* handle thunk rejected promise for sign in/up */}
            {error && (
              <p className='text-red-600 text-sm italic'>
                {error.message}
              </p>
            )}
            {/* sign in or up button */}
            <div className='mt-4 mb-3'>
              <button className='mb-1.5 px-2 py-1.5 block w-full text-white  bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600'>
                {isSignup ? "Sign up" : "Sign in"}
              </button>
              <button
                disabled
                className='disabled:opacity-25 flex flex-wrap justify-center w-full border border-gray-300 text-white enabled:hover:border-gray-500 px-2 py-1.5 rounded-md'
              >
                <img
                  className='w-5 mr-2'
                  src='https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'
                />
                Sign {isSignup ? "up" : "in"} with Google
              </button>
            </div>
          </div>
        </form>

        {/* footer w/ sign in or up switching button */}
        <div className='text-center'>
          <span className='text-xs text-gray-400 font-semibold'>
            {isSignup ? "Already have an account" : "Don't have account?"}
          </span>
          <a
            className='text-xs hover:cursor-pointer hover:text-sm hover:underline font-semibold pl-1 text-white '
            onClick={signInUp}
          >
            {isSignup ? "Sign in" : "Sign up"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
