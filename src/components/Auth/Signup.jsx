import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast methods
import 'react-toastify/dist/ReactToastify.css';
import AccountInformation from './AccountInformation';
import PasscodeSetup from './PasscodeSetup';
import BiometricSetup from './BiometricSetup';
import KYCSetup from './KYCSetup';
import { registerUser } from '../../services/api';
import { useUser } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const {userProfile} = useUser()
  const navigate = useNavigate();

  useEffect(() => {
      if (userProfile) {
        navigate('/profile');
      }
    }, [userProfile]);
  const handleNext = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(userData);
      toast.success('Registration Successful!');
      navigate("/Login")
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      toast.error(`Registration Failed: ${errorMessage}`);
      console.error('Error in Registration:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Toast Container */}
      <ToastContainer />

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {step === 1 && <AccountInformation onNext={handleNext} />}
        {step === 2 && <PasscodeSetup onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <BiometricSetup onNext={handleSubmit} userData={userData} onBack={handleBack} />}
        {/* {step === 4 && <KYCSetup onNext={handleSubmit} userData={userData} onBack={handleBack} />} */}
      </div>
    </div>
  );
};

export default SignUp;
