import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/postsSlice";
import ReactPaginate from "react-paginate";

function PaginatedItems() {
  const navigate = useNavigate();
  // get the page query string in the URL
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // navigate to '?page=1' when the component first mounted if there is no page
  // also dispatch the fetchPosts thunk action everytime page changes
  const dispatch = useDispatch();
  useEffect(() => {
    if (!page) navigate("?page=1");
    dispatch(fetchPosts(page));
  }, [dispatch, navigate, page]);

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
        pageCount={totalPage || 0}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default PaginatedItems;
