import { useState } from "preact/hooks";
import { TargetedEvent } from "preact/compat";

import axios from "axios";

interface AddCommentFormProps {
    articleName: string
    onArticleUpdated: Function
}

const AddCommentForm = ({articleName, onArticleUpdated}: AddCommentFormProps)  => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async() => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }
    return (
        <div id="add-comment-form">
            <h3> Add a Comment</h3>
            <label>
                Name:
                <input value={name} 
                    onChange={(e: TargetedEvent) => {
                        if (e)
                            setName((e.target as HTMLInputElement).value)
                    }} 
                    type="text" />
            </label>
            <label>
                Comment:
                <textarea rows={4} cols={50} value={commentText} onChange={(e: TargetedEvent) => {
                    if (e)
                        setCommentText((e.target as HTMLInputElement).value);
                }}/>
                
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm