"use client";
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (email === "") return toast.error("Please Enter Email ")
        if (password === "") return toast.error("Please Enter Password")
        //Submit the form data to the server
        console.log(`Form submitted with email: ${email} and password: ${password}`)
        // Reset form inputs
        setEmail('')
        setPassword('')
        router.replace('/') // no back to login
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

                <button type='submit' className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl p-3 mt-3  w-full "> Login</button>


            </form>
        </div>
    )
}

export default LoginForm