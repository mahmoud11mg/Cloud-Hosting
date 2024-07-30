import Link from "next/link";

const acticlesSkeleton=[1, 2, 3, 4, 5, 6] ;

const Loading = () => {
  return (
    <section className="h-96 container w-full px-5 md:w-3/4 m-auto mt-8 animate-pulse">
    <div className="bg-white p-7 rounded-lg">
      
        <h1 className=" bg-gray-300 mb-2 h-6 rounded-lg"></h1>
        <div className="bg-gray-300 h-4 rounded-lg"></div>
        <p className=" bg-gray-300 h-4 mt-5 rounded-lg"></p>
          </div>

    <div className="mt-8">
         <div className="p-2 rounded-lg bg-gray-300"></div>    
         <p className="bg-gray-300 rounded-lg mt-2 p-1 h-8 w-20"></p>
    </div>
    
   
  
  </section>
  )
}

export default Loading