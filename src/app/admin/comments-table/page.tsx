import { getAllComments } from "@/apiCalls/adminApiCall";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteCommentButton from "./DeleteCommentButton";
const AdminCommentsTable = async () => {

  const token = cookies().get("jwtToken")?.value || "";
  if (!token) redirect("/");
   
  const comments : Comment[] =  await getAllComments(token);

  return (

    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Commants</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-lg">
          <tr>
            <th className="px-1 lg:p-2">Comment</th>
            <th className="hidden lg:inline-block p-3">Created At</th>
            <th className="">Action</th>
             </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr className="border-b border-t border-gray-300" key={comment.id}>
              <td className="p-3 text-gray-700">{comment.text}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(comment.createdAt).toDateString()}
              </td>
              <td className="p-3">
              <DeleteCommentButton commentId={comment.id}/>

              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
       
    </section>
  )
}

export default AdminCommentsTable