import './App.css';
import Homee from './pages/Homee';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Semantic from './pages/Semantic';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import Dummy from './pages/Dummy';

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
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster/>
      </div>
    </>
  );
}

export default App;
