import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkerAlt } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../providers/AuthProvider';
import UpdateProfileForm from '../UserHome/UpdateProfileForm';

const AdminProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [profileData, setProfileData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user?.email) {
      const fetchProfileData = async () => {
        try {
          const response = await axiosPublic.get(`/user/email/${user.email}`);
          if (response.data.role === 'admin') {
            setProfileData(response.data);
          } else {
            console.error('User is not an admin');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };

      fetchProfileData();
    }
  }, [user?.email, axiosPublic]);

  if (loading || !profileData) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Admin Profile</title>
      </Helmet>

      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="cover"
          src="https://img.freepik.com/premium-photo/empty-background-scene-dark-street-reflection-wet-asphalt-rays-neon-light-dark-neon-figures-smoke-background-empty-stage-show-abstract-dark-background_183410-31.jpg?w=900"
          className="w-full mb-4 rounded-t-lg h-36 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={profileData?.photoURL || 'https://via.placeholder.com/150'}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>
          <span className="bg-blue-500 text-white text-xs uppercase px-4 py-1 rounded-full mt-2">
            {profileData?.role || 'Admin'}
          </span>
          <h1 className="text-xl font-semibold text-gray-800 mt-2">
            {profileData?.name || user?.name || 'Admin'}
          </h1>
          <p className="text-gray-600">
            <FaMapMarkerAlt className="inline text-blue-500" />{' '}
            {profileData?.upazila || 'Upazila'},{' '}
            {profileData?.district || 'District'}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
          >
            Update Admin
          </button>
        </div>
      </div>

      {showForm && (
        <UpdateProfileForm
          onClose={() => setShowForm(false)}
          profileData={profileData}
          setProfileData={setProfileData}
        />
      )}
    </div>
  );
};

export default AdminProfile;
