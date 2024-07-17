"use client";
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddCommentForm = () => {
    const [text, setText] = useState('')

    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault()

        if(text ==="") return toast.error("Please Search For Articles")
          //Submit the form data to the server
         // Reset form inputs
         setText('')
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
                   <button type='submit' className="bg-sky-600 text-2xl hover:bg-sky-700 text-white rounded-xl p-3 mt-3 w-[190px]  "> 
                     Comment </button>
            </form>
        </div>
    )
}

export default AddCommentForm 