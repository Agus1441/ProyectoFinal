const Comment = ({commentData}) => {
    return(
        <div>
            {commentData.writerName + " " + commentData.content}
            <br />
            {commentData.replies.map(reply => {
                {reply.writerName + " " + reply.content}
                <br />
                {reply.lifetime}
            })}
            <br />
            {commentData.lifetime}
        </div>
    )
}

export default Comment;