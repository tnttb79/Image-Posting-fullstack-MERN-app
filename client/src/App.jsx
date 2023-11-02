import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <div className='h-screen mx-40'>
      <Navbar />
      <div className='grid grid-cols-3 gap-2'>
        <Routes>
          <Route path='/' element={<Navigate to={"/posts"} />} />
          <Route path='/posts' element={<Home />} />
          <Route
            path='/auth'
            // if the user is already login. Stop them from accessing auth route
            element={!user?.token ? <Auth /> : <Navigate to={"/posts"} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
