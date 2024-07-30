"use client";
import { useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface UpdateCommentModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    commentId: number; // Updated prop name
}

const UpdateCommentModal = ({ setOpen, text, commentId }: UpdateCommentModalProps) => {
    const [updateText, setUpdateText] = useState(text);
    const router = useRouter();

    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (updateText === "") return toast.info("Please Enter Comment Text");
        try {
            await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: updateText }); // Corrected URL
            router.refresh();
            setUpdateText("");
            setOpen(false);
            toast.success('Comment Updated Successfully');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'An error occurred'); // Fixed error response handling
            console.log(error);
        }
    };

    return (
        <div className='fixed top-0 left-0 bottom-10 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center h-[100%]'>
            <div className='w-11/12 lg:w-2/4 bg-white rounded-lg p-3'>
                <div className='flex items-start justify-end mb-5'>
                    <IoMdCloseCircleOutline onClick={() => setOpen(false)} className='text-3xl text-red-500 cursor-pointer' />
                </div>
                <form onSubmit={formSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Edit Comment...."
                        className='w-full rounded-lg text-xl text-gray-900 bg-white p-2 mb-2'
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='bg-green-700 text-white text-xl rounded-lg mt-2 p-1 w-full hover:bg-green-900 transition'
                    >
                        Edit Comment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCommentModal;
