import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, sendOtp, verifyOtp } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import * as onz from 'onz-auth';
import { useUser } from '../../context/UserProvider';

const auth = new onz.Auth({
  clientID: 'test5-57736114e6', //Replace with your client id
  containerID: 'myLoginDiv', // Optional, defaults to 'container'
  isIframe: false, // Optional, defaults to 'false'
});

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    passCode: '',
    otp: '',
  });
  const { userProfile, login } = useUser();
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status
  const [reqId, setreqId] = useState();
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification status
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [User, setUser] = useState(); 
  const [showPasscode, setShowPasscode] = useState(false); // State for toggling passcode visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      navigate('/profile');
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    setIsLoggingIn(true);
    auth.showLogin();
  };
  const handleLogout = () => auth.logout();
  const handleCancelLogin = () => auth.close();

  auth.on("closed", () => {
    setIsLoggingIn(false);
  });

  auth.on("authenticated", result => {
    setIsLoggedIn(true);
    updateUserTokens();
  });

  auth.on("logged_out", () => {
    setIsLoggedIn(false);
    setUser(null);
  });

  auth.on("error", error => {
    alert(error);
  });

  const handleSendOtp = async () => {
    try {
      const response = await sendOtp({ username: formData.username });
      if (response && response.response.requestId) {
        setIsOtpSent(true);
        setreqId(response.response.requestId);
        toast.success('OTP sent successfully!');
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      toast.error(`Error sending OTP user ${error.message}`);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp({
        request_id: reqId, // Assuming `username` stores the request_id temporarily, adjust if needed
        code: formData.otp,
      });
      if (response && response.status) {
        setIsOtpVerified(true); // OTP verified successfully
        toast.success('OTP verified!');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error('Error verifying OTP');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      updateUserTokens();
      // navigate('/profile');
    }
 }, [isLoggedIn, navigate]);

 function updateUserTokens() {
  const accessToken = auth.getAccessToken();
  const accessTokenJwt = auth.getDecodedAccessToken();
  const idTokenJwt = auth.getDecodedIDToken();
  setUser({
    accessToken: accessToken,
    accessTokenJwt: accessTokenJwt,
    idTokenJwt: idTokenJwt
  });
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      toast.error('Please verify OTP first');
      return;
    }
    try {
      if(!isLoggedIn){
        await auth.showLogin()
      }
      if(isLoggedIn){
        const response = await loginUser(formData);
        toast.success('Login successful!');
        login(response);
      }
    } catch (error) {
      const errorMessage = error?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  const togglePasscodeVisibility = () => {
    setShowPasscode((prev) => !prev); // Toggle the passcode visibility
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Toast Container */}
      <ToastContainer />

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login to your Account</h1>
        <p className="text-sm text-center mb-6">
          Enter your Username and Passcode, then verify OTP
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500"
              maxLength={8}
              required
            />
          </div>

          {/* Passcode */}
          <div>
            <label className="block text-sm mb-1">Passcode</label>
            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'} // Toggle between text and password
                name="passCode"
                value={formData.passCode}
                onChange={handleChange}
                placeholder="Enter Passcode"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                onClick={togglePasscodeVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasscode ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm mb-1">OTP</label>
            <div className="relative">
              <input
                type="tel"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500"
                required
              />
              {!isOtpSent ? (
                <a
                  href="#"
                  onClick={handleSendOtp}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400"
                >
                  Send OTP
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-gray-900 py-1 px-4 rounded-md"
                >
                  Verify OTP
                </button>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 rounded-md font-bold transition ${
              !isOtpVerified ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isOtpVerified}
          >
            {isLoggedIn ? "Login" : "Authenticate"}
          </button>
        </form>
        <div id="myLoginDiv"></div>
        <div className="p-5 mt-4 w-full bg-gray-900 hover:bg-black text-white flex justify-center text-gray-900 py-2 rounded-md font-bold transition">
          <a href="/register"> Don't have an account? Register here</a>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          NOTE: Provide correct information related to yourself, your phone number, and other
          details as they will be used for authentication and verification.
        </p>
      </div>
    </div>
  );
};

export default Login;
