import React, { useEffect, useState } from "react";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";

interface SingleArticlePageProps {
  params: { id: string; }
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);


  const article: SingleArticle = await getSingleArticle(params.id);

  return (
    <section className="container m-auto px-5">
      <div className="flex items-center justify-center flex-wrap gap-5 pt-8 mb-7">
        <div className="p-5 rounded-lg my-1 shadow-lg bg-white mt-12 w-full md:w-[70%] lg:w-full">
          <span className="text-blue-950 text-2xl flex items-center justify-center">{article.id}</span>
          <h1 className="text-3xl font-bold text-gray-700">{article.title}</h1>
          <p className="my-2 text-lg text-gray-950 p-1 mt-5">{article.description}</p>
          <div className="text-gray-500 p-1">{new Date(article.createdAt).toDateString()}</div>
        </div>
      </div>
      <div className="mt-7">
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="my-2 font-bold text-sky-800 md:text-xl">
            To Write A Comment You Should Log In First
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 px-1 font-semibold mb-2 mt-7">Comments</h4>
      {article.comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} isAdmin />
      ))}
    </section>
  );
}

export default SingleArticlePage;
