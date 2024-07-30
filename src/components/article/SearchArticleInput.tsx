"use client";
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const SearchArticleInput = () => {
    const [searchText, setSearchText] = useState('')
    
    const router = useRouter();
    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault()
    
        if(searchText ==="") return toast.error("Please Search For Articles")
          //Submit the form data to the server
         // Reset form inputs
         setSearchText('')
         router.push(`/articles/search?searchText=${searchText}`)
          }
    return (
        <div>
            <form onSubmit={formSubmitHandler} className=" my-5 w-full md:w-2/3 m-auto" action="">
                <input type="search" 
                className="w-full p-3 rounded-lg text-xl border-sky-300 
                border-y-2 border-dashed  text-gray-900 bg-white 
                focus:animate-pulse  "
                    id="searchText"
                    placeholder="Search For Articles" 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    />
            </form>
        </div>
    )
}

export default SearchArticleInput