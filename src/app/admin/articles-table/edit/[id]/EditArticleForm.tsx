"use client";
import { DOMAIN } from '@/utils/constants';
import { Article } from '@prisma/client';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface EditArticleFormProps{
    article :Article;
}


const EditArticleForm = ({article}:EditArticleFormProps)  => {
    const router = useRouter();
    const [title, setTitle] = useState(article.title)
    const [description, setDescription] = useState(article.description)

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault()
        if(title ===""  ) return toast.error("Titile Is Required ", { autoClose: 2000 })
        if(description ==="" ) return toast.error("Description Is Required")
            try{
                await axios .put(`${DOMAIN}/api/articles/${article.id}`,{description,title});
                
                toast.success(' Article Updated Successfully', { autoClose: 1000 })
                 router.push('/admin/articles-table?pageNumber=1');
                  router.refresh();
                

       
         }catch(error:any){
            toast.error(error?.response?.data.message, { autoClose: 2000 })
            console.error(error)
        };
    }
    return (
        <div>
            <form onSubmit={formSubmitHandler} className=" flex flex-col" action="">
                <input type="text" className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none mb-3 focus:ring-sky-600 ring-1 rounded-lg"
                    id="Title"
                    placeholder="Edit Article Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea 
                    className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-sky-600 ring-1 rounded-lg "
                    name="description" 
                    id="description"
                    rows={5}
                    placeholder=" Edit Article  Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    
                    ></textarea>

                <button className="bg-green-600 hover:bg-green-800 text-white rounded-xl p-3 mt-3  w-full font-bold "> Edit</button>


            </form>
        </div>
    )
}

export default EditArticleForm