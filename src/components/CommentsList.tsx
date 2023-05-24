export interface Comment {
    text: string,
    postedBy: string
}

export interface CommentsListProps {
    comments: Comment[]
}

const CommentsList = ({comments}: CommentsListProps) => {
    console.log(`Comments in commentslist`);
    console.log(comments);
    return (
    
    <>
        <h3>Comments</h3>
        {comments.map((comment) => (
            <div className="comment" key={comment.postedBy + ": " + comment.text}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        )
            
        )};
     </>
   
)};

export default CommentsList