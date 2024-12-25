import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api'; // Import your API method
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const response = await getUserProfile(token);
        setUserProfile(response);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        localStorage.removeItem('token'); // Clear invalid token
      }
    };
    
    fetchUser();
  },[]);

  const login = (profile) => {
    localStorage.setItem('token', profile.token); // Save token on login
    navigate('/profile');
  };

  const logout = () => {
    setUserProfile(null); 
    localStorage.removeItem('token'); // Clear token on logout
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
