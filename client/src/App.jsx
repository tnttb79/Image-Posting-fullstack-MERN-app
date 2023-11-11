import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import DetailedPage from "./components/DetailedPage/DetailedPage";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <div className='h-full mx-32 p-2 overflow-hidden'>
      <Navbar />
      <div className='grid grid-cols-3 gap-2 w-full h-full '>
        <Routes>
          <Route path='/' element={<Navigate to={"/posts"} />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/posts/search' element={<Home />} />
          <Route path='posts/:id' element={<DetailedPage />} />
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
