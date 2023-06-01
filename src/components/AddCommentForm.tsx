import { useState } from "react";
import axios from "axios";
import { ChangeEvent } from "react";

import useUser from "../hooks/useUser";

interface AddCommentFormProps {
    articleName: string
    onArticleUpdated: Function
}

const AddCommentForm = ({articleName, onArticleUpdated}: AddCommentFormProps)  => {
    // const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const {user, isLoading} = useUser();

    const addComment = async() => {
        const token = user && await user?.getIdToken();
        const headers = token ? {
            authtoken: token,
        } : {};

        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            text: commentText,
        }, {headers});
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setCommentText('');
    }
    return (
        <div id="add-comment-form">
            <h3> Add a Comment</h3>
            <p>You are posting as {user?.email}</p>
                <textarea rows={4} cols={50} value={commentText} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    if (e)
                        setCommentText((e.target as HTMLTextAreaElement).value);
                }}/>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm