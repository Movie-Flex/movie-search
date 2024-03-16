import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Semantic from './pages/Semantic';

function App() {
  return (
    <>
    {/* <Routes> */}
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/semantic" element={<Semantic />} /> */}
      {/* <Home/> */}
      <Semantic/>
    {/* </Routes> */}
    </>
  );
}

export default App;
