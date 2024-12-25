import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitKycDetails } from '../../services/api';
import { useUser } from '../../context/UserProvider';

const KYCSetup = () => {
  const {userProfile} = useUser()
  
  const [formData, setFormData] = useState({
    userId : userProfile._id,
    fullName: '',
    address: '',
    country: '',
    city: '',
    zipCode: '',
    email: '',
    aadhaarNumber: '',
    id : '',
    selfie : ''
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    id: null,
    selfie: null,
  });
  const [kycStatus, setKycStatus] = useState('Verification Pending');
  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    const file = files[0];
  
    // Ensure file is selected
    if (file) {
      const reader = new FileReader();
  
      // This will run when the file is fully loaded
      reader.onloadend = () => {
        // Convert the file to a base64 string
        const base64String = reader.result.split(',')[1]; // Extract the base64 string part
  
        // Store the base64 string
        setUploadedFiles((prev) => ({
          ...prev,
          [name]: base64String, // This stores the file data as a base64 string
        }));
      };
  
      // Read the file as a base64 string
      reader.readAsDataURL(file);
    }
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleBack = (e) => {
    navigate("/profile")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!uploadedFiles.id || !uploadedFiles.selfie || !formData.email || !formData.aadhaarNumber) {
      toast.error('Please fill in all fields and upload the required documents');
      return;
    }
  
    try {
     
      formData.id =  uploadedFiles.id
      formData.selfie = uploadedFiles.selfie
      
      const response = await submitKycDetails(formData);
      setKycStatus('Verification in progress');
      toast.success('KYC data submitted successfully');
      navigate('/profile');
    } catch (error) {
      // Handle errors
      const errorMessage = error?.response?.data?.err || error?.message;
      toast.error(`KYC Submission Failed: ${error}`);
      console.error('KYC Submission Error:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      {/* Toast Container */}
      <ToastContainer />

      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">KYC/AML Setup</h1>
        <p className="text-sm text-center mb-8">
          Please complete the KYC verification by entering your details and uploading the necessary documents.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div className="col-span-2">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>
          {/* Full name */}
          <div className="col-span-2">
            <label className="block text-sm mb-2">FullName</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Aadhaar Number */}
          <div className="col-span-2">
            <label className="block text-sm mb-2">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              placeholder="Enter Aadhaar number"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block text-sm mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* ZIP Code */}
          <div>
            <label className="block text-sm mb-2">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="ZIP Code"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Upload ID */}
          <div>
            <label className="block text-sm mb-2">Upload ID</label>
            <input
              type="file"
              name="id"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Upload Selfie */}
          <div>
            <label className="block text-sm mb-2">Upload Selfie</label>
            <input
              type="file"
              name="selfie"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 rounded-md font-bold transition"
            >
              Submit KYC
            </button>
          </div>

          {/* Back Button */}
          <div className="col-span-2">
            <button
              onClick={handleBack}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-bold transition"
            >
              Back
            </button>
          </div>
        </form>

        {/* Status Display */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          Status: {kycStatus}
        </p>

        {/* Redirect to login */}
        <div className="mt-4 text-center">
          <a href="/login" className="text-yellow-500 hover:underline">
            Already have an account? Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default KYCSetup;
