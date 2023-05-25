import { useState, useEffect } from "preact/hooks";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

// interface ArticleInfo {
//     upvotes: number,
//     comments: Comment[]
// }

const ArticlePage  = () => {
    const params = useParams();
    const [articleInfo, setArticleInfo] = useState/*<ArticleInfo>*/({upvotes: 0, comments: []});
    
    const [user, isLoading] = useUser();
    if( isLoading) {
        console.log('Loading user');
    }
    const articleId = params.articleId;
    // can also be const {articleId} = useParams();

    const addUpvote = async() => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        setArticleInfo(response.data);
    }

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;// as ArticleInfo;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, [articleId]);

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
                    ? <button onClick={addUpvote}>Upvote</button> 
                    : <button >Log in to vote!</button> 
                }
                
                <p>This article has {articleInfo.upvotes} upvote(s).</p>
            </div>
            {article.content.map((paragraph, index) => (
                <p key={`${article.name}-${index}`}>{paragraph}</p>
            ))}
            { user 
                ? <AddCommentForm articleName={articleId} onArticleUpdated={setArticleInfo}/>
                : <button>Log in to leave a comment!</button>
            }
            <CommentsList comments={articleInfo.comments}/>
        </>
        
    );
}
// onClick={()=>{navigate('/login')}}
export default ArticlePage;