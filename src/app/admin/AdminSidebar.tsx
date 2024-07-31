import Link from "next/link"
import { CgMenuGridR } from "react-icons/cg"
import { FaRegComments } from "react-icons/fa"
import { MdOutlineArticle } from "react-icons/md"

const AdminSidebar = () => {
    return (

        <>
            <Link className="flex items-center text-lg lg:text-2xl font-semibold"
                href={'/admin'}>
                <CgMenuGridR className="text-3xl me-1" />
                <span className="hidden lg:block" >Dashboard</span>
            </Link>

            <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
                <Link className="flex items-center text-xl mb-5 active:border-yellow-200 focus:border-yellow-200  active:text-yellow-200 focus:text-yellow-200 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition"
                    href={'/admin/articles-table?pageNumber=1'}>
                    <MdOutlineArticle className=" me-1" />
                    <span className="hidden lg:block">Articles</span>
                </Link>

                <Link className="flex items-center text-xl mb-5  active:border-yellow-200 focus:border-yellow-200  active:text-yellow-200 focus:text-yellow-200 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition"
                    href={'/admin/comments-table'}>
                    <FaRegComments className=" me-1" />
                    <span className="hidden lg:block">Comments</span>
                </Link>
            </ul>

        </>

    )
}

export default AdminSidebar