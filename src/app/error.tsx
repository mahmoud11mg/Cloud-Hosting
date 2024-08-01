'use client'
import Link from "next/link"

interface  ErrorPageProps{
    error:Error;
    reset: () => void;
}

const Error = ({error,reset}:ErrorPageProps) => {
  return (
    <div className="pt-7 text-center ">
            <div className="text-3xl  text-red-600 font-semibold">
                 Somthing went wrong
            </div>
            
            <h2 className="text-gray-700 my-3 text-xl">Error Massage :{error.message}</h2>
            <button onClick={() => reset() } className=" bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full" >
                 Try again </button>
    <Link className="text-lx text-blue-700 block mt-6" href={'/'}>Go to Home Page</Link>
    </div>
  )
}

export default Error