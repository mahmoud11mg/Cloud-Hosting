import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { Article } from "@/utils/types";

interface SingleArticlePageProps {
  params: { id: string; }
}

const SingleArticlePage  = async ({ params }: SingleArticlePageProps) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const article: Article = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to fetch article:`);
  }
  // Get the current date

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  return (
    <section className="container m-auto px-5">
      <div className="flex items-center justify-center flex-wrap gap-5 pt-8 mb-7">
        <div className="p-5 rounded-lg my-1 shadow-lg bg-white mt-12 w-full md:w-[70%] lg:w-full">
          <span className="text-blue-950 text-2xl flex items-center justify-center"> {article.id}</span>
          <h1 className="text-3xl font-bold text-gray-700">{article.title}</h1>
          <p className="my-2 text-lg text-gray-950 p-1 mt-5">{article.body}</p>
          <div className="text-gray-500 p-1">{formattedDate}</div>
        </div>
      </div>
      <AddCommentForm/>
      <h4 className=" text-xl text-gray-800 px-1 font-semibold mb-2 mt-7"> Comments</h4>
      <CommentItem/>
      <CommentItem/>
      <CommentItem/>
    </section>
  );
}

export default SingleArticlePage;
