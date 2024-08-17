import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const password = watch('password');

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              phone: data.phone,
            };
            axiosPublic.post('/user', userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                toast.success('User created successfully.');
                navigate('/dashboard');
              }
            });
          })
          .catch((error) => console.error('Profile update error:', error));
      })
      .catch((error) => console.error('Create user error:', error));
  };

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full m-5 max-w-xl p-8 space-y-8 bg-white shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-center">Create an Account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="sm:flex gap-4">
              <div className="form-control w-full">
                <label className="block text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>

              <div className="form-control mt-3 sm:mt-0 w-full">
                <label className="block text-gray-700">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Your Photo URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                  {...register('photoURL')}
                />
              </div>
            </div>

            <div className="sm:flex gap-4">
              <div className="form-control w-full">
                <label className="block text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              <div className="form-control w-full mt-3 sm:mt-0">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="sm:flex gap-4">
              <div className="form-control w-full">
                <label className="block text-gray-700">Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />
                {errors.password?.type === 'required' && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-red-500">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === 'maxLength' && (
                  <p className="text-red-500">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === 'pattern' && (
                  <p className="text-red-500">
                    Password must have one uppercase, one lowercase, one number,
                    and one special character
                  </p>
                )}
              </div>

              <div className="form-control w-full mt-3 sm:mt-0">
                <label className="block text-gray-700">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                  {...register('confirm_password', {
                    required: true,
                    validate: value =>
                      value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirm_password && (
                  <p className="text-red-500">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-orange-500 hover:underline">
              Already have an account? Login here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
