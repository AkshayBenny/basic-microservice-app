const CommentList = ({ comments }) => {
    const renderedComments = Object.values(comments).map((comment) => {
        return (
            <div key={comment.id}>
                <p className='font-light text-sm italic border-t py-3'>
                    {comment.comment}
                </p>
            </div>
        )
    })
    return <div>{renderedComments}</div>
}

export default CommentList
