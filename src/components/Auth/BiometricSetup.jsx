import React, { useState } from 'react';

const BiometricSetup = ({ onNext, onBack }) => {
  const [biometricStatus, setBiometricStatus] = useState(null);

  const handleFaceID = () => {
    setBiometricStatus('FaceID Scanned');
  };

  const handleFingerprint = () => {
    setBiometricStatus('Fingerprint Scanned');
  };

  const handleSubmit = () => {
    if (!biometricStatus) {
      alert('Please scan FaceID or Fingerprint');
      return;
    }
    onNext({ biometricStatus });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Biometric Setup</h2>
      <div className="space-y-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md" onClick={handleFaceID}>Scan FaceID</button>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md" onClick={handleFingerprint}>Scan Fingerprint</button>
      </div>
      {biometricStatus && <p className="text-center text-lg text-gray-400">{biometricStatus}</p>}
      <button onClick={handleSubmit} className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 rounded-md font-bold transition">Next</button>
      <button onClick={onBack} className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-bold transition">Back</button>
    </div>
  );
};

export default BiometricSetup;
