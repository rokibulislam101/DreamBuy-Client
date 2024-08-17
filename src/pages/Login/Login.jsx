import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify'; // Import toast
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard'; // Default to dashboard

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Ensure email and password are provided
    if (!email || !password) {
      toast.error('Please fill in both fields!');
      return;
    }

    signIn(email, password)
      .then(result => {
        const user = result.user;
        toast.success('User login successful!');
        navigate('/dashboard', { replace: true });
      })
      .catch(error => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full m-5 max-w-xl p-8 space-y-8 bg-white shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="block text-gray-700">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            <div className="form-control">
              <label className="block text-gray-700">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="form-control">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-orange-500"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
              </div>
              <Link to="#" className="text-orange-500 hover:underline">
                Lost your password?
              </Link>
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link to="/register" className="text-orange-500 hover:underline">
              Create an account? Register here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
