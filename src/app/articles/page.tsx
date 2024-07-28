import ArticleItme from "@/components/article/ArticleItme";
import Pagination from "@/components/article/Pagination";
import SearchArticleInput from "@/components/article/SearchArticleInput";
import { Article } from "@/utils/types";

const ArticlesPage = async () => {

  await new Promise((resolve) => setTimeout(resolve, 2000)) ;

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {cache:'no-store'}
      );
    if (!response.ok) {
      throw new Error(`Failed To Fetch Article:`);
    }
  const article: Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput/>
      <div className=" flex items-center justify-center flex-wrap gap-7">
        {article.slice(0,6).map(item => (
          <ArticleItme article={item} key={item.id} />
        ))}
      </div>
        <Pagination/>
    </section>
  )
}

export default ArticlesPage