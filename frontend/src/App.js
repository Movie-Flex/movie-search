import './App.css';
import Homee from './pages/Homee';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Semantic from './pages/Semantic';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import Dummy from './pages/Dummy';
import Subscription from './components/Subscription/Subscription';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import AdminLogin from './pages/AdminLogin.jsx'; //Imported AdminLogin component

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
              path="/dummy"
              element={<Dummy/>}
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
            <Route                        //Route for admin login added 
                path="/adminlogin"
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
