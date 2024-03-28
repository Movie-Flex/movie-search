import './App.css';
import Homee from './pages/Homee';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Semantic from './pages/Semantic';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile';
import Subscription from './components/Subscription/Subscription';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import VideoPlayer from './pages/VideoPlayer'
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Homee />}
              />
              <Route
              path="/profile"
              element={<Profile/>}
              />
              <Route
                path="/semantic"
                element={<Semantic />}
                />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route 
                path="/subscription"
                element={<Subscription/>}
                />
            <Route 
                path="/paymentgateway"
                element={<PaymentGateway/>}
                />
            <Route path ="/video" 
                element={<VideoPlayer/>} 
                />
            <Route path ="/adminlogin" 
                element={<AdminLogin/>} 
                />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster/>
      </div>
    </>
  );
}

export default App;
