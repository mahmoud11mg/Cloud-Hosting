import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ARTICLE_PER_PAGE, DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
import Link from "next/link";
import { getArticles } from "@/apiCalls/articleApiCall";
import Pagination from "@/components/article/Pagination";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/utils/db";

interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}

const AdminArticlesTable = async ({ searchParams: { pageNumber } }: AdminArticlesTableProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Article</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-lg">
          <tr>
            <th className="px-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block">Created At</th>
            <th className="">Action</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr className="border-b border-t border-gray-300" key={article.id}>
              <td className="p-1 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <Link
                  className="text-white bg-green-600 rounded-lg p-2 hover:bg-green-800 transition mr-3 w-[50%]"
                  href={`/admin/articles-table/edit/${article.id}`}
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId ={article.id}/>
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link
                  className="text-white bg-sky-600 rounded-lg p-2 hover:bg-sky-800 transition"
                  href={`/articles/${article.id}`}
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pageNumber={parseInt(pageNumber)} route="/admin/articles-table" pages={pages} />
    </section>
  );
};

export default AdminArticlesTable;
