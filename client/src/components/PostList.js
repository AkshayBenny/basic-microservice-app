import axios from 'axios'
import { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate'

export const PostList = (props) => {
	const [posts, setPosts] = useState({})
	console.log(posts)
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get('http://localhost:4000/posts')

			setPosts(res.data)
		}
		try {
			fetchPosts()
		} catch (error) {
			window.alert('Error fetching posts')
		}
	}, [props.posts])

	let renderedPosts = Object.values(posts).map((post) => {
		return (
			<div
				key={post.id}
				className='border p-3 rounded-md border-black'>
				<h2 className='uppercase font-light text-xl pb-4'>
					{post.title}
				</h2>
				<CommentCreate postId={post.id} />
			</div>
		)
	})

	return (
		<div className='px-12'>
			<h1 className='p-12'>My Posts</h1>
			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{renderedPosts}
			</div>
		</div>
	)
}
