"use client";
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import ButtonSpinner from '@/components/ButtonSpinner';

const RegisterForm = () => {
    const router = useRouter();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "") return toast.error("Please enter email");
        if (password === "") return toast.error("Please enter password");
        if (username === "") return toast.error("Please enter username");
        
        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/users/register`, { email, password, username });
            router.replace('/'); // No back to login
            setLoading(false);
            toast.success('Registration successful');
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Registration failed");
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler} className="flex flex-col">
                <input
                    type="text"
                    className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none mb-3 focus:ring-sky-600 ring-1 rounded-lg"
                    id="userName"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none mb-3 focus:ring-sky-600 ring-1 rounded-lg"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-sky-600 ring-1 rounded-lg mb-3"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl p-3 mt-3 w-full"
                >
                    {loading ? <ButtonSpinner /> : "Register"}
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
