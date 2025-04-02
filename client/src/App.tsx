import PostCreate from './PostCreate'
import { PostList } from './PostList'

function App() {


  return (
    <>
      <div className='container'>
        <h1>Create Post</h1>
        <PostCreate />
        <h1 className='mt-5'>Post</h1>
        <PostList />

      </div>

    </>
  )
}

export default App
