import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPostsBySearch } from "../../features/postsSlice";
import SearchIcon from "./Icons/SearchIcon";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state to store value from search bar
  const [search, setSearch] = useState("");
  // set value from search bar
  const handleChange = (e) => {
    setSearch(() => e.target.value);
  };
  
  // navigate to URL with new query string to the dispatch can work
  const handleSearch = () => {
    if (search) {
      navigate(`/posts/search?s=${search}`);
    } else {
      navigate(`/`);
    }
  };
  // help users to search by pressing Enter
  const handleSearchKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch()
    }
  }

  // get query string from URL to dispatch fetchPostsBySearch thunk action
  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get("s");

  // dispatch fetchPostsBySearch thunk action 
  // only if there is a search query string
  useEffect(() => {
    if (searchTitle) {
      dispatch(fetchPostsBySearch(searchTitle));
    }
  }, [searchTitle, dispatch]);

  return (
    <div className='relative ml-4 mb-3 border-gray-800'>
      <span className='absolute top-3 left-3'>
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
      </span>
      <input
        type='search'
        name='search'
        onChange={handleChange}
        onKeyDown={handleSearchKeyPress}
        className='py-2 pl-12 w-full text-lg italic text-gray-700 border rounded-md bg-white focus:outline-none focus:ring shadow-[2px_2px_3px_3px_#718096]'
        placeholder='Search by title...'
      />
    </div>
  );
};

export default Search;
