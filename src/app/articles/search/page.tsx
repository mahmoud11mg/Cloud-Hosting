import { getArticlesBasedOnSarch } from "@/apiCalls/articleApiCall";
import ArticleItme from "@/components/article/ArticleItme";
import { Article } from "@prisma/client";

interface SearchArticlePageProps{
  searchParams:{searchText :string} ;

}
const SearchPage = async ({searchParams:{searchText}}:SearchArticlePageProps) => {
const articles:Article[] = await getArticlesBasedOnSarch(searchText);
  return (
    <section className="h-96 container m-b px-5 ">
    {articles.length === 0 ? (
      <h2 className="text-gray-800 text-2xl font-bold px-5 mx-1 ">Articles Based On
      <span className="text-red-500 mx-1">{searchText}</span>
       Not found  </h2>
    ): (
      <>
      
    <h1 className="text-2xl font-bold mb-3 mt-7 text-gray-800">
    Articles Based On
    <span className="ms-1 text-green-700 text-3xl font-bold ">{searchText}</span>
    </h1>
   <div className=" flex items-center justify-center flex-wrap gap-7" >
     {articles.map(item => (
       <ArticleItme key={item.id}  article={item}/>
     ))}
    
   </div>

      </>
    )}
      </section>
  )
}

export default SearchPage