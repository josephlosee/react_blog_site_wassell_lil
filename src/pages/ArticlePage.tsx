import { useState, useEffect } from "preact/hooks";
import { useParams } from "react-router";
import axios from "axios";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";
import CommentsList, {Comment} from "../components/CommentsList";

interface ArticleInfo {
    upvotes: number,
    comments: Comment[]
}

const ArticlePage  = () => {
    const params = useParams();
    const [articleInfo, setArticleInfo] = useState<ArticleInfo>({upvotes: 0, comments: [] as Comment[]});
    
    const articleId = params.articleId;
    // can also be const {articleId} = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data as ArticleInfo;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, [articleId]);

    // console.log(articleInfo.comments);
    const article = articles.find(article => article.name === articleId);
    

    if (article === undefined){
        return <NotFoundPage/>;
    }

    return (
        <>
            <h1>{article.title}</h1>
            <p>This article has {articleInfo.upvotes} upvote(s).</p>
            {article.content.map((paragraph, index) => (
                <p key={`${article.name}-${index}`}>{paragraph}</p>
            ))}
            <CommentsList comments={articleInfo.comments}/>;
        </>
        
    );
}

export default ArticlePage;