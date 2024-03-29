import axios from 'axios'
import { useEffect, useState } from 'react'
import CommentList from './CommentList'

const CommentCreate = ({ postId }) => {
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState({})

	const submitHandler = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post(
				`http://localhost:4001/posts/${postId}/comments`,
				{ comment },
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': '*',
					},
				}
			)
			setComment('')
			setComments(res.data.comments)
		} catch (error) {
			window.alert(error.message)
		}
	}

	useEffect(() => {
		const fetchComments = async () => {
			const res = await axios.get(
				`http://localhost:4001/posts/${postId}/comments`,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			setComments(res.data)
		}
		try {
			fetchComments()
		} catch (error) {
			window.alert('Error fetching comments')
		}
	}, [])

	return (
		<>
			<form
				className='flex items-center justify-center gap-3'
				onSubmit={submitHandler}>
				<input
					type='text'
					name='comment'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className='border px-4 py-2 w-full rounded-md'
					placeholder='Enter comment...'
				/>
				<button
					type='submit'
					className='bg-black text-white px-4 py-2'>
					Create
				</button>
			</form>
			<div className='mt-4 px-3 pb-6  pt-3 '>
				<h3 className='uppercase font-light italic text-md pb-4'>
					Comments
				</h3>
				<CommentList comments={comments} />
			</div>
		</>
	)
}

export default CommentCreate
