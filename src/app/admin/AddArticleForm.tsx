"use client";
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';



const AddArticleForm = ()  => {
    const router = useRouter();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault()
        if(title ===""  ) return toast.error("Titile Is Required ", { autoClose: 2000 })
        if(description ==="" ) return toast.error("Description Is Required", { autoClose: 2000 })
            try{
                await axios .post(`${DOMAIN}/api/articles`,{description,title});
                setTitle("");
                setDescription("");
                toast.success('New Article Added Successfully', { autoClose: 1000 })
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
                    placeholder="Enter Article Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea 
                    className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-sky-600 ring-1 rounded-lg "
                    name="description" 
                    id="description"
                    rows={5}
                    placeholder=" Enter Article  Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    
                    ></textarea>

                <button className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl p-3 mt-3  w-full "> Add</button>


            </form>
        </div>
    )
}

export default AddArticleForm