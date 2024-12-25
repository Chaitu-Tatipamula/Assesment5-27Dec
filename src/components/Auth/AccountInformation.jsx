import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import CSS for PhoneInput styling

const AccountInformation = ({ onNext }) => {
  const [formData, setFormData] = useState({
    username: '',
    dob: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Account Information Setup</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <PhoneInput
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            className="w-full px-4 py-2 rounded-md text-black bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 rounded-md font-bold transition">Next</button>
      </form>
      <div className="p-5 mt-4 w-full bg-gray-900 hover:bg-black text-white flex justify-center text-gray-900 py-2 rounded-md font-bold transition">
          <a href="/login"> Already have an account? Login here</a>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          NOTE: Provide correct information related to yourself, your phone number, and other
          details as they will be used for authentication and verification.
        </p>
    </div>
  );
};

export default AccountInformation;
