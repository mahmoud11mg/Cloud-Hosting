import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const AdminUsersTable = async () => {
    const token = cookies().get("jwtToken")?.value || "";
    if (!token) redirect("/");

    const payload = verifyTokenForPage(token);
    if (payload?.isAdmin === false) redirect("/");


       return (
        <section className="p-5">
            <h1 className="mb-7 text-2xl font-semibold text-gray-700">Users</h1>
            <table className="table w-full text-left">
                <thead className="border-t-2 border-b-2 border-gray-500 lg:text-lg">
                    <tr>
                        <th className="px-2 p-2 lg:p-2">Username</th>
                        <th className="px-2 p-2 lg:p-2">Email</th>
                        <th className="px-2 p-2 lg:p-2">Created At</th>
                        <th className="px-2 p-2 lg:p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr className="border-b border-t border-gray-300" >
                            <td className="p-1 text-gray-700"> 1</td>
                            <td className=" text-gray-700 font-normal p-3"> 1 </td>
                            <td className=" text-gray-700 font-normal p-3"> 1 </td>
                            <td className=" text-gray-700 font-normal p-3"> 1 </td>
                           
                        </tr>
                    
                </tbody>
            </table>

                   </section>
    );
};

export default AdminUsersTable;
