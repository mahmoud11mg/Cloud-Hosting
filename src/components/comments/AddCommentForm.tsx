"use client";
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DOMAIN } from '@/utils/constants';
import {IoMdAddCircleOutline,} from 'react-icons/io';

interface AppComentFormProps {
    articleId:number;
}

const AddCommentForm = ({ articleId } : AppComentFormProps) => {
    const router = useRouter();
    const [text, setText] = useState('')

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault()

        if(text === "") return toast.error("Please Add Comment To Articles")
            try{
                await axios.post(`${DOMAIN}/api/comments`,{ text, articleId })
                router.refresh()
                setText("")
                

        }catch(error:any) {
            toast.error(error?.response?.data.message)
            console.error(error)
            
        };
         
          }

    return (
        <div>
            <form onSubmit={formSubmitHandler}action="">
                <input type="text" className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
                    id="searchText"
                    placeholder="Add Comment" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    />
                  <button type='submit' 
                  className= " mt-4 bg-sky-600 text-2xl hover:bg-sky-700 text-white rounded-xl p-3 w-[190px] flex items-center justify-center space-x-2">
                    <IoMdAddCircleOutline className='text-center text-3xl' />
                    <span>Comment</span>
                                    </button>

            </form>
        </div>
    )
}

export default AddCommentForm 