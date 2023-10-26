import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useState } from "react";

const Home = () => {
  // store and pass mongoID of the editing post
  const [updatingID, setUpdatingID] = useState(null);

  return (
    <>
      <div className='w-full col-span-2'>
        <Posts setUpdatingID={setUpdatingID} />
      </div>
      <div className='w-full'>
        <Form setUpdatingID={setUpdatingID} updatingID={updatingID} />
      </div>
    </>
  );
};

export default Home;
