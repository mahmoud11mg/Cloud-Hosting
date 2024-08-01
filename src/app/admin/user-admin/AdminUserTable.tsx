import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/apiCalls/userApiCall";
import prisma from "@/utils/db";
import { User } from "@/utils/types"; // Update import path if needed
import AdminUsersTableClient from "./AdminUsersTableClient";
import { NextRequest } from "next/server";
import { ToastContainer } from "react-toastify";


const AdminUsersTable = async () => {
    const token = cookies().get("jwtToken")?.value || "";
    if (!token) redirect("/");

    const payload = verifyTokenForPage(token);
    if (payload?.isAdmin === false) redirect("/");

    const users: User[] = await getAllUsers();
    const count: number = await prisma.user.count();
 async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
        try {
            console.log("Request Params:", params);
             const body = await request.json();
            console.log("Request Body:", body);
    
            // Other server logic...
    
        } catch (error: any) {
            console.error("Error:", error.message);
            // Handle error...
        }
    }
    

    return (
        <section className="p-5">
            <h1 className="mb-7 text-2xl font-semibold text-gray-700">Users</h1>
            <AdminUsersTableClient users={users} />
           
        </section>
    );
};

export default AdminUsersTable;
