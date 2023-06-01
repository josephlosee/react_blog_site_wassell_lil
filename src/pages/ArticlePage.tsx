import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

interface ArticleInfo {
    upvotes: number,
    comments: Comment[],
    canUpvote?: boolean,
}

const ArticlePage  = () => {
    const params = useParams();
    const [articleInfo, setArticleInfo] = useState<ArticleInfo>({upvotes: 0, comments: []});
    const { canUpvote } = articleInfo;
    const { user, isLoading } = useUser();
    if( isLoading) {
        console.log('Loading user');
    }
    const articleId = params.articleId;
    // can also be const {articleId} = useParams();

    const addUpvote = async() => {
        const token = user && await user?.getIdToken();
            const headers = token ? {
                authtoken: token,
            } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers});
        setArticleInfo(response.data);
    }

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user?.getIdToken();
            const headers = token ? {
                authtoken: token,
            } : {};
            const response = await axios.get(`/api/articles/${articleId}`, {
                headers,
            });
            const newArticleInfo = response.data;// as ArticleInfo;
            setArticleInfo(newArticleInfo);
        }
        if (isLoading) {
            loadArticleInfo();
        }
        
    }, [isLoading, user]);

    // console.log(articleInfo.comments);
    const article = articles.find(article => article.name === articleId);
    

    if (!article){
        return <NotFoundPage/>;
    }

    const navigate = useNavigate();

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                { user 
                    ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button> 
                    : <button >Log in to vote!</button> 
                }
                
                <p>This article has {articleInfo.upvotes} upvote(s).</p>
            </div>
            {article.content.map((paragraph, index) => (
                <p key={`${article.name}-${index}`}>{paragraph}</p>
            ))}
            { user 
                ? <AddCommentForm articleName={articleId!} onArticleUpdated={setArticleInfo}/>
                : <button>Log in to leave a comment!</button>
            }
            <CommentsList comments={articleInfo.comments}/>
        </>
        
    );
}
// onClick={()=>{navigate('/login')}}
export default ArticlePage;