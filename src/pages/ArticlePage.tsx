import { useParams } from "react-router";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";

const ArticlePage  = () => {
    const params = useParams();

    const articleId = params.articleId;
    const article = articles.find(article => article.name === articleId);
    // can also be const {articleId} = useParams();

    if (article === undefined){
        return <NotFoundPage/>;
    }

    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map(paragraph => (
                <p>{paragraph}</p>
            ))}
        </>
        
    );
}

export default ArticlePage;