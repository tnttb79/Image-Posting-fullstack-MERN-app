# MyGallery Fullstack-MERN-Redux Toolkit:
## Initialize the project:
#### Back-end:
- `npm init -y` 
- create folder structure for back-end
- install neccessary dependencies for back-end development (cors, nodemon, etc...)
- type: "module" to use ES6 in the backend
- Express: 
	- Set up Express: `cors()`, `json()`, `urencoded()`, etc
	- MongoDB Atlas cluster setup
	- Connect to MongoDB using mongoose
	- `app.listen()`
- create routes in a separate directory
- create logic of routes handlers in controller directory: this is the logic for each request. Need to put them in a separate folder as a good practice.
(Then move to client side to create basic structure like Form, Post)
 
#### Front-end:
- initialize the project with Vite
- delete uneccessary files
- install neccessary dependencies (TailwindCSS, Axios, etc...)
- create basic structure of the app like Form, Post, NavBar with Tailwind

## CRUD:
### Fetch Post (with RTK):
- create get route to fetch all post in the back-end
- set up basic RTK in the app (store, postSlice, reducers, etc)
- create fetchPost async action logic using createAsyncThunk to fetch all post and store them in redux store. 
- useEffect to dispatch fetch post action everytime the app is mounted

### Create Post: (no redux yet, but can use w Redux to make changes w/o refreshing the page)
- create put route to create post in the back-end
- use axios to send post request to server 
- the form data will be sent using FormData()
- using Multer in the backend
- storing file in the file system
- store file name in MongoDB
- use <img/> src attribute to display the image.

### Update post: (no Redux yet)
#### Back-end:
- create patch route to update post in the back-end
- using Multer to parse multipart-form data from the client side. Express need multer to be able to parse multipart-form data
- handle case where there is no new file in the update with if clause since the req.file will be undefined
- if there is no file, the selectedFile name string can be parsed from req.body
- if there is new file udpate, multer will store new file and then store the filename string in MongoDB
#### Front-end:
- get the mongoDB ID of the post by props drilling
- the useState in the app component to store ID of the editing post
- Post will have access to setID and Form will have access to currentID
- the form will be get the current post data from redux store if there is a currentID
- then prepopulate the form with useEffect (if logic when there is an editingPost fetch from Redux availlable)
- then use Axios to send the patch request 
- use if clause in the handleSubmit function to determine when to send post and patch request with updatingID
- clear the form with setForm from useState
	
### Delete Post: (with RTK, use unlink from fs module, no multer needed)
#### Back-end:
- create delete route
- get the id from the req.params
- delete the document from MongoDB
- use the deletedItem result to determine if there is a file to delete
- find the correct path of the img and delete it in the if clause
#### Front-end:
- create a delete thunk in postSlice
- return the id of the post from the thunk
- add reducer logic to delete post with filter() and _id
- dispatch deletePost action in the Post component
- the UI will automatically update since the Posts component subscribes to the store with useSelector() hook
	
## Authentication (with JWT, bcrypt) will be updated soon:	

## Pagination: 
#### Front-end: 
- use react-paginate package to build a pagination component
- use useEffect to navigate to `?page=1` when the component first mounted
- also useEffect to dispatch fetchPost(page) thunk action everytime page is changed
- page will be change by handlePageClick provided by react-paginate, it will navigate, update the query string in the URL and lead to useEffect dispatch the fetchPost(page) thunk action.
- update the getPosts API call to accepts current page as argument
- update fetchPosts thunk action for pagination.
- update the states to accept totalPage besides Posts
- totalPage will be fetched from the Redux store using useSelector
- style the pagination component according to the react-paginate docs
#### Back-end:
- no need to update the getPosts route for query string to work
- get the page from the front-end API call via req.query
- use page and hard-coded limit variables to write mongoose query to fetch appropriate portion of posts:      
	`mongoose query: const posts = await PostsModel.find().limit(limit).skip((page-1)*limit).sort({createdAt: -1});`
- send back the totalPage, and fetched posts 

## Search:
#### Front-end:
- create a simple search bar component with a search button
- useState to get value from the search bar
- handleChange function will navigate to the `/search?s=search_query_in_here`
- the search component will get the query string with useSearchParams if there is any
- then useEffect will dispatch fetchPostsBySearch(searchQuery) thunk action if there is any query string (create new API call, thunk action, update the state)
- the Posts component use useSelector so it will rerender when Redux store got update with fetchPostsBySearch thunk action
- also hide the pagination when search is perform, so I need to limit the number of post to 8 for better UI
- this can be handle later but will take more time
#### Back-end:
- create new routes for search
- get the search query from req.body
- convert search query to regEx for the mongoose find() method
- limit to 8 results for better UI

 ## Detailed Page

 ## Reccommended Posts

 ## Comments
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
