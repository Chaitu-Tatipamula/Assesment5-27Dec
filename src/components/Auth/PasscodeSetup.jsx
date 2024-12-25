import React, { useState } from 'react';

const PasscodeSetup = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    passCode: '',
  });

  const [showPasscode, setShowPasscode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasscodeVisibility = () => {
    setShowPasscode((prev) => !prev);
  };

  const validatePasscode = () => {
    const { passCode } = formData;
    return passCode.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePasscode()) {
      alert('Passcode must be at least 6 characters');
      return;
    }
    onNext(formData);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Passcode Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type={showPasscode ? 'text' : 'password'}
            name="passCode"
            value={formData.passCode}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500"
            placeholder="Enter Passcode"
            required
          />
        </div>
        <button
          type="button"
          onClick={handlePasscodeVisibility}
          className="text-xs text-gray-400 hover:text-white"
        >
          {showPasscode ? 'Hide' : 'Show'}
        </button>
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 rounded-md font-bold transition">Next</button>
      </form>
      <button onClick={onBack} className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-bold transition">Back</button>
    </div>
  );
};

export default PasscodeSetup;
