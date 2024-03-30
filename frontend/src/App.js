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
import SearchResult from './pages/SearchResult';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Movie from './pages/Movie';
import YourMovies from './pages/YourMovies';

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
                element={<Profile />}
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
                element={<Subscription />}
              />
              <Route
                path="/paymentgateway"
                element={<PaymentGateway />}
              />
              <Route path="/video/:index"
                element={<VideoPlayer />}
              />
              <Route path="/searchResult"
                element={<SearchResult />}
              />
              <Route path="/adminLogin"
                element={<AdminLogin />}
              />
              <Route path="/adminDashboard"
                element={<AdminDashboard />}
              />
              <Route path='/movie/:id/:idx'
              element={<Movie/>}/>

<Route path='/getYourMovies'
              element={<YourMovies/>}/>
            </Routes>

          </div>
        </BrowserRouter>
        <Toaster />
      </div>
    </>
  );
}

export default App;
