"use client";
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import ButtonSpinner from '@/components/ButtonSpinner';



const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (email === "") return toast.error("Please Enter Email ", { autoClose: 2000 })
        if (password === "") return toast.error("Please Enter Password", { autoClose: 2000 })
            try{
                setLoading(true);
                await axios.post(`${DOMAIN}/api/users/login`,{ email, password })
                router.replace('/') // no back to login
                setLoading(false);
                toast.success('LogIn  Successfully', { autoClose: 1000 })
                router.refresh();

        }catch(error:any){
            toast.error(error?.response?.data.message, { autoClose: 2000 })
            console.error(error)
            setLoading(false);

        }

         
        // router.push('/') // back to login

    }
    return (
        <div>
            <form onSubmit={formSubmitHandler} className=" flex flex-col" action="">
                <input type="email" className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none mb-3 focus:ring-sky-600 ring-1 rounded-lg"
                    id="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-sky-600 ring-1 rounded-lg "
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button disabled={loading} type='submit' className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl p-3 mt-3  w-full ">
                     {loading ? <ButtonSpinner/> : "LogIn"}
                     </button>


            </form>
        </div>
    )
}

export default LoginForm