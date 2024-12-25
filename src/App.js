import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import Profile from './components/Auth/Profile';
import Home from './pages/Home';
import { UserProvider } from './context/UserProvider';
import KYCSetup from './components/Auth/KYCSetup';


function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/submit-kyc" element={<KYCSetup />} />
      </Routes>
    </UserProvider>
    </Router>
  );
}

export default App;
