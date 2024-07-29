import { Article } from "@prisma/client";
import Link from "next/link"

interface ArticleItmeProps {
    article: Article;

}
const ArticleItme = ({ article }: ArticleItmeProps) => {
    return (
        <div className="p-3 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4">
            <span className="text-blue-900">{article.id}</span>
            <h3 className=" text-xl font-bold text-gray-900 line-clamp-1">{article.title}</h3>
            <p className="my-2 text-lg  text-gray-700 p-1 line-clamp-1" >{article.description}</p>
            <Link className="text-xl bg-purple-700 hover:bg-purple-800 w-full text-center p-1 text-white rounded-lg"
                href={`/articles/${article.id}`}> Read More </Link>
        </div>
    )
}

export default ArticleItme