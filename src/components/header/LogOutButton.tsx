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
 className='bg-gray-700 text-gray-200 px-1 rounded' >Logout</button>
  )
}

export default LogOutButton