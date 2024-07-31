"use client"
import { CommentWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { toast } from 'react-toastify';

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
  isAdmin: boolean; // Added to check if the user is an admin
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commentDeleteHandler = async () => {
    try {
         if(confirm("Are you sure you want to delete")){
          await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
          router.refresh();
          toast.success('Comment deleted successfully', { autoClose: 1000 });
         }
        
       } catch (error: any) {
      toast.error(error?.response?.data.message, { autoClose: 2000 });
      console.error(error)
      console.log(error);
    }
  }

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">{comment.user.username}</strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">{new Date(comment.createdAt).toDateString()}</span>
      </div>
      <p>{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit onClick={() => setOpen(true)} className="text-green-600 text-xl cursor-pointer me-3" />
          <FaTrash onClick={commentDeleteHandler} className="text-red-600 text-xl cursor-pointer" />
        </div>
      )}
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  )
}

export default CommentItem;
