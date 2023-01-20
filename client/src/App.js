// import logo from './logo.svg'
import { useState } from 'react'
import axios from 'axios'
import { PostList } from './components/PostList'
function App() {
	const [post, setPost] = useState('')
	const [posts, setPosts] = useState([])

	const submitHandler = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post(
				'http://localhost:4000/posts',
				{ title: post },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const { title, id } = res.data
			setPosts([...posts, { id, title }])

			setPost('')
		} catch (error) {
			window.alert(error.message)
		}
	}

	return (
		<div className=''>
			<h1 className='text-xl font-semibold text-center mt-12 mb-6 '>
				POST APP
			</h1>
			<form
				onSubmit={submitHandler}
				className='mx-auto flex items-center justify-center border w-fit'>
				<input
					type='text'
					onChange={(e) => setPost(e.target.value)}
					placeholder='Enter post title...'
					value={post}
					className='border border-gray-300  p-2'
				/>
				<button
					type='submit'
					className='bg-black text-white px-4 py-2'>
					Add
				</button>
			</form>
			<div>
				<PostList posts={posts} />
			</div>
		</div>
	)
}

export default App
