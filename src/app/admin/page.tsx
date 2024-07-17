import AdminArticlesForm from "./AdminArticlesForm"

const Adminpage = () => {

  return (
    <div className="flex items-center justify-center px-5 lg:px-20  mt-6">
     <div className="shadow p-4 bg-purple-200 rounded w-full"> 
       <h2 className="text-xl lg:text-2xl  font-bold text-gray-800 mb-4"> Add New Article </h2>
       <AdminArticlesForm />

     </div>

    </div>
  
  )
}

export default Adminpage