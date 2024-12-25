import axios from 'axios';

// Create a reusable axios instance
const apiClient = axios.create({
  baseURL: 'https://proxyserver-3sfh.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle API errors centrally
const handleApiError = (error) => {
  console.error('API Error:', error.response?.data || error.message);
  throw error.response?.data || error.message;
};

// API services
export const registerUser = async (data) => {
  try {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const  loginUser = async (formData) => {
  try {
    const response = await apiClient.post('/auth/login', formData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const  logOut = async (token) => {
  try {
    const response = await apiClient.post('/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`, // Send token with the request
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const  logOutAll = async (token) => {
  try {
    const response = await apiClient.post('/auth/logoutAll', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token with the request
        }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendOtp = async (data) => {
  try {
    const response = await apiClient.post('/auth/send-otp', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const verifyOtp = async (data) => {
  try {
    const response = await apiClient.post('/auth/verify-otp', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await apiClient.get('/users/profile',{
        headers: {
          Authorization: `Bearer ${token}`, // Send token with the request
        }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const submitKycDetails = async (data) => {
  try {
    const response = await apiClient.post('auth/kyc', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getKycDetails = async (data) => {
  try {
    const response = await apiClient.get('auth/getKyc', {
      headers: {
        userid: `${data}`, // Send token with the request
      }
  });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

