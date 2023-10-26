import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <div className='h-screen mx-40'>
      <Navbar />
      <div className='grid grid-cols-3 gap-2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
