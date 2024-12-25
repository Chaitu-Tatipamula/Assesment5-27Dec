import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserProvider';
const Home = () => {
  const {userProfile} = useUser()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-sm mb-6">Please choose an option below:</p>
        <div className="space-y-4">
         {!userProfile && 
          <>
            <Link to="/login" className="block text-lg text-yellow-500 hover:text-yellow-600">Login</Link>
            <Link to="/register" className="block text-lg text-yellow-500 hover:text-yellow-600">Sign Up</Link>
          </>
          }
         { userProfile && <Link to="/profile" className="block text-lg text-yellow-500 hover:text-yellow-600">Already LoggedIn</Link>}
        </div>
      </div>
    </div>
  );
};

export default Home;
