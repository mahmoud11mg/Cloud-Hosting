import Link from "next/link";

const acticlesSkeleton=[1, 2, 3, 4, 5, 6] ;

const Loading = () => {
  return (
    <section className='h-96 px-5 container m-auto animate-pulse  p-3 rounded-lg my-1  '>

      <div className='my-5 w-full md:w-2/3 m-auto bg-gray-300 h-12 rounded '></div>

      <div className='flex items-center justify-center flex-wrap gap-7'>
      {acticlesSkeleton.map ((item) =>(
          <div key={item} className="p-5 rounded-lg my-1 w-full md:w-2/5 lg:w-1/4 bg-gray-200">
          <h3 className="h-6 bg-gray-300"></h3>
          <p className="my-2 p-1 h-10 bg-gray-300 " ></p>
       
      </div>

       ))}

      </div>
      <div className="w-[40%]  my-5   m-auto bg-gray-400 h-12 rounded" > </div>
        

    </section>
  )
}

export default Loading