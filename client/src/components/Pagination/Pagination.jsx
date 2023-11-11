import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/postsSlice";
import ReactPaginate from "react-paginate";

function Pagination() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get the page query string in the URL
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const s = searchParams.get("s")

  // dispatch the fetchPosts thunk action everytime page changes
  // and there is no search query string
  // with this if check, user can paste URL for each search
  useEffect(() => {
    if (!s) {
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page, s]);

  // get totalPage from Redux store after the action has been dispatched
  const { totalPage } = useSelector((state) => state.posts);

  // navigate, update URL when click on a new page
  const handlePageClick = (event) => {
    navigate(`?page=${event.selected + 1}`);
  };

  return (
    <>
      <ReactPaginate
        containerClassName='flex gap-2 justify-center font-bold text-lg bg-gray-800 text-white mt-4 ml-4 p-2 rounded-md shadow-[2px_2px_3px_3px_#718096]'
        activeClassName='bg-gray-600 '
        pageClassName='border hover:bg-gray-600 rounded-full px-2 mx-1'
        previousClassName='border hover:bg-gray-600 rounded-full px-2'
        nextClassName='border hover:bg-gray-600 rounded-full px-2'
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        // when there a search, put 0 so it doesn't render pagination component
        pageCount={!s ? (totalPage || 0) : 0}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default Pagination;
