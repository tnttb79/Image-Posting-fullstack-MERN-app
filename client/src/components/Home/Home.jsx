import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Search from "../Search/Search";

const Home = () => {
  // store and pass mongoID of the editing post
  const [updatingID, setUpdatingID] = useState(null);

  return (
    <>
      <div className='w-full col-span-2'>
        <Posts setUpdatingID={setUpdatingID} />
      </div>
      <div className='w-full'>
        <Search/>
        <Form setUpdatingID={setUpdatingID} updatingID={updatingID} />
        <Pagination />
      </div>
    </>
  );
};

export default Home;
