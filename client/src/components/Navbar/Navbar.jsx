import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../features/authSlice";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  // get user info from localStorage. This way data is persist even if we refresh
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("profile"))
  );

  // sign out w Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = useCallback(() => {
    dispatch(signOut());
    setUser(null);
    navigate("/auth");
  }, [dispatch, navigate]);

  // sign out the user when the token is expired
  // (this effect happens when the user go to another page
  // also put the setUser in here so when we click sign in
  // the UI will update)
  const location = useLocation();
  useEffect(() => {
    if (user) {
      const decodedToken = jwt_decode(user.token);
      if (decodedToken.exp * 1000 < Date.now()) logOut();
    }
    if (!user) {
      setUser(() => JSON.parse(localStorage.getItem("profile")));
    }
  }, [location, logOut, user]);

  return (
    <div className='w-full p-5 my-5 bg-gray-900 shadow-[2px_2px_3px_3px_#718096] col-span-3 rounded-lg flex justify-between items-center'>
      <Link className='text-white text-5xl font-bold italic' to='/'>
        Memories
      </Link>
      {user ? (
        <div className='flex'>
          <p className='text-white font-bold text-xl capitalize mr-4 my-1'>
            {user?.existingUser.name}
          </p>

          <button
            className='py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200'
            onClick={logOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          to='/auth'
          className='py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200'
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Navbar;
