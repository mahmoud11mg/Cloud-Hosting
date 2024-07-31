"use client"
import { useRouter } from 'next/navigation';
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";

interface DeleteCommentButtonProps {
    commentId: number;
}

const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
    const router = useRouter();

    const deleteCommentHandle = async () => {
        try {
            if(confirm('Are you sure you want to Delete Comment')){
            await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
            router.refresh();
            toast.success("Comment deleted successfully", { autoClose: 1000 });
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred", { autoClose: 2000 });
            console.error(error);
        }
    }

    return (
        <div 
            className="text-white text-center py-1 cursor-pointer rounded-lg p-2 px-2 inline-block bg-red-600 hover:bg-red-800 transition"
            onClick={deleteCommentHandle}
        >
            Delete
        </div>
    );
}

export default DeleteCommentButton;
