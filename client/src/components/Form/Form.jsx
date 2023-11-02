import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileUploader from "./FileUploader/FileUploader";
import * as API from "../../api/index";

const Form = ({ setUpdatingID, updatingID }) => {
  // get editing post from store if we are editing a post
  const editingPost = useSelector((state) =>
    updatingID
      ? state.posts.posts.find((post) => post._id === updatingID)
      : null
  );

  // state to hold data from the form
  const [form, setForm] = useState({
    title: "",
    descriptions: "",
    tags: "",
    selectedFile: "",
  });

  // prepopulate the form when editing a post
  useEffect(() => {
    editingPost &&
      // handle the case when we update the post with no photo
      // since if originally there's no img uploaded append method
      // will append  "undefined" string instead of an "" empty string
      setForm(() => {
        if (!form.selectedFile) {
          return { ...editingPost, selectedFile: "" };
        }
        return editingPost;
      });
  }, [editingPost, form.selectedFile]);

  //handler function to get the file from the child components
  //using setFile function from useState hook
  //then combine it with other data of the form
  //then make a post request to the serve with all the data

  // get upload file from the upload component
  const handleChange = (e) => {
    setForm({ ...form, selectedFile: e.target.files[0] });
  };

  const clearForm = () => {
    setForm({
      title: "",
      descriptions: "",
      tags: "",
      selectedFile: "",
    });
    setUpdatingID(null);
  };

  // get the current user info to append to the formData
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", user.existingUser.name);
    formData.append("title", form.title);
    formData.append("descriptions", form.descriptions);
    formData.append("tags", form.tags);
    formData.append("selectedFile", form.selectedFile);

    if (updatingID) {
      // update post
      API.updatePost(updatingID, formData)
        .then((res) => {
          console.log("Patch request success:", res);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      // create post
      API.createPost(formData)
        .then((res) => {
          console.log("Post request successfull:", res);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    clearForm();
  };

  return (
    <div className='p-6 ml-4 rounded-lg shadow-[2px_2px_3px_3px_#718096] bg-gray-800'>
      {!user ? (
        <p className='text-white text-lg font-bold italic py-5'>
          Please sign in to create your post !!!
        </p>
      ) : (
        <>
          <h1 className='text-3xl font-bold text-white capitalize dark:text-white'>
            {updatingID ? "Edit Post" : "Create Post"}
          </h1>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {/* title */}
              <div>
                <label
                  className='text-white dark:text-gray-200'
                  htmlFor='title'
                >
                  Title
                </label>
                <input
                  id='title'
                  type='text'
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className='w-full px-4 py-2 mt-2 text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                />
              </div>
              {/* descriptions */}
              <div>
                <label
                  className='text-white dark:text-gray-200'
                  htmlFor='descriptions'
                >
                  Descriptions
                </label>
                <textarea
                  id='descriptions'
                  type='textarea'
                  value={form.descriptions}
                  onChange={(e) =>
                    setForm({ ...form, descriptions: e.target.value })
                  }
                  className='w-full px-4 py-2 mt-2 text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                ></textarea>
              </div>
              {/* tags */}
              <div>
                <label className='text-white dark:text-gray-200' htmlFor='tags'>
                  Tags{" "}
                  <p className='italic inline text-sm'>(comma separated)</p>
                </label>
                <input
                  id='tags'
                  type='text'
                  value={form.tags}
                  onChange={(e) => {
                    setForm({ ...form, tags: e.target.value });
                  }}
                  className='w-full px-4 py-2 mt-2 text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                />
              </div>
              {/* image upload */}
              <FileUploader
                value={form.selectedFile}
                handleChange={handleChange}
              />
              {/* submit button */}
              <button className='px-6 py-2 text-white  bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600'>
                {updatingID ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
