"use client";
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import {toast} from  'react-toastify';
import { useRouter } from 'next/navigation';



const LogOutButton = () => {
    const router = useRouter();
    const logOutHandler = async () => {
        try {
            await axios.get(`${DOMAIN}/api/users/logout`)
            toast.success('Logged Out Successfully')
            router.push('/')
            router.refresh();

        } catch (error) {
            toast.error('Something Went Wrong')
            console.error(error)
        }

    }
  return (
 <button 
 onClick={logOutHandler}
 className=' text-white px-1 p-2 font-bold rounded  bg-sky-700  hover:bg-sky-800  ' >Logout</button>
  )
}

export default LogOutButton