import Link from "next/link"


const NotFoundPage = () => {
  return (
    <section className="flex justify-center items-center flex-col mt-24">
        <h1 className="text-7xl text-gray-800 font-bold  animate-bounce">404</h1>
        <p className="text-gray-500 text-3xl mt-2 mb-5 animate-pulse ">Page Not Found </p>
        <Link className=" text-xl no-underline text-blue-700 " href={"/"}>Go To Home Page</Link>
    </section>
  )
}

export default NotFoundPage