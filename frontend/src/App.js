import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Semantic from './pages/Semantic';
import Login from './pages/Login';
import Signup from './pages/SignUp';

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
      </div>
    </>
  );
}

export default App;
