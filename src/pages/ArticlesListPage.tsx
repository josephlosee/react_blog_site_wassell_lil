import articles from "./ArticleContent";
import ArticlesList from "../components/ArticlesList";

const ArticleListPage  = () => {
    return (
        <><h1>Articles</h1>
        <ArticlesList articles={articles}></ArticlesList>
        </>
    );
}

export default ArticleListPage;