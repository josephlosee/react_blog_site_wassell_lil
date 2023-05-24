import { useState, useEffect } from "preact/hooks";
import { useParams } from "react-router";
import axios from "axios";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";

const ArticlePage  = () => {
    const params = useParams();
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});
    
    const articleId = params.articleId;

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, [articleId]);

    const article = articles.find(article => article.name === articleId);
    // can also be const {articleId} = useParams();

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
        </>
        
    );
}

export default ArticlePage;