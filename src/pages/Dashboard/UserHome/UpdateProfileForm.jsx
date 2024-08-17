import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const UpdateProfileForm = ({ onClose, profileData, setProfileData }) => {
  const { updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(profileData?.name || '');
  const [photoURL, setPhotoURL] = useState(profileData?.photoURL || '');

  const handleSubmit = async e => {
    e.preventDefault();
    await updateUserProfile(name, photoURL);
    // Update local profile data to reflect changes immediately
    setProfileData(prevData => ({
      ...prevData,
      name,
      photoURL,
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={e => setPhotoURL(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
