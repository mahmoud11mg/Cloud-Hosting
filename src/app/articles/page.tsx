import SearchArticleInput from "@/components/article/SearchArticleInput";
import { Article } from "@prisma/client";
import { getArticles } from "@/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import ArticleItme from "@/components/article/ArticleItme";
import Pagination from "@/components/article/Pagination";
import prisma from "@/utils/db";


interface ArticlePageProps {
    searchParams: { pageNumber: string }
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
    const { pageNumber } = searchParams;
  

    const articles: Article[] = await getArticles(pageNumber);
    const count: number = await prisma.article.count();

    const pages = Math.ceil(count / ARTICLE_PER_PAGE);

    return (
        <section className="container m-auto px-5">
            <SearchArticleInput />
            <div className="flex items-center justify-center flex-wrap gap-7">
                {articles.map(item => (
                    <ArticleItme article={item} key={item.id} />
                ))}
            </div>
            <Pagination pageNumber={parseInt(pageNumber, 10)} route="/articles" pages={pages} />
        </section>
    );
}

export default ArticlesPage;
