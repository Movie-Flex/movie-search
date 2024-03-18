import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Semantic from './pages/Semantic';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import Dummy from './pages/Dummy';
import Subscription from './components/Subscription';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home />}
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
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster/>
      </div>
    </>
  );
}

export default App;
