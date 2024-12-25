import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { getKycDetails } from '../../services/api';

const Profile = () => {
  const { userProfile, logout } = useUser();
  const [kycDetails, setKycDetails] = useState();
  const navigate = useNavigate();

  // Fetch KYC details using the user profile _id
  useEffect(() => {
    if (userProfile && userProfile._id) {
      const fetchKycDetails = async () => {
        try {
          const response = await getKycDetails(userProfile._id);
          
          if (response) {
            setKycDetails(response.kycDetails);
          }
          toast.success('Fetched KYC details');
        } catch (error) {
          toast.error(`Failed to fetch KYC details, ${error.message}`);
          console.error('Error fetching KYC details:', error);
        }
      };
      fetchKycDetails();
    }
  }, [userProfile]);

  const handleKycSubmit = async () => {
    navigate("/submit-kyc");
  };

  if (!userProfile) {
    return <p>Loading...</p>; // Optional loading state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <ToastContainer />
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Welcome, {userProfile.username}</h1>
        <h2 className="text-lg text-center mb-8 text-gray-400">User Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p><strong>UserId:</strong> {userProfile.userId}</p>
            <p><strong>Username:</strong> {userProfile.username}</p>
            <p><strong>Mobile:</strong> {userProfile.phoneNumber}</p>
            <p><strong>Date of Birth:</strong> {userProfile.dob}</p>
            <p><strong>Role:</strong> {userProfile.role}</p>
            <p><strong>KYC Status:</strong> {userProfile.kycStatus}</p>
          </div>

          <div className="mt-8 md:mt-0">
            <h2 className="text-lg text-center mb-4 text-gray-400">KYC Details</h2>
            {kycDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p><strong>Full Name:</strong> {kycDetails.fullName || 'Not Provided'}</p>
                  <p><strong>Email:</strong> {kycDetails.email}</p>
                  <p><strong>Address:</strong> {kycDetails.address + ", " + kycDetails.city + ", " + kycDetails.country}</p>
                  <p><strong>KYC Status:</strong> {kycDetails.status}</p>
                </div>
                
                <div className="flex gap-10">
                  <div>
                    <p><strong>Selfie:</strong> {kycDetails.selfie ? (
                      <img 
                        src={`data:image/jpeg;base64,${kycDetails.selfie}`} 
                        alt="Selfie" 
                        className="w-full h-full object-cover rounded-lg border-2 border-gray-600"
                      />
                    ) : 'Not Provided'}</p>
                  </div>
                  <div>
                    <p><strong>ID:</strong> {kycDetails.id ? (
                      <img 
                        src={`data:image/jpeg;base64,${kycDetails.id}`} 
                        alt="Government ID" 
                        className="w-full h-full object-cover rounded-lg border-2 border-gray-600"
                      />
                    ) : 'Not Provided'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={handleKycSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-lg font-semibold transition"
          >
            Submit KYC Details
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md text-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
