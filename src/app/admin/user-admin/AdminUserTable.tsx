import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/apiCalls/userApiCall";
import prisma from "@/utils/db";
import { User } from "@/utils/types"; // Update import path if needed
import AdminUsersTableClient from "./AdminUsersTableClient";
import { NextRequest } from "next/server";

const AdminUsersTable = async () => {
  
    const users: User[] = await getAllUsers();
    const count: number = await prisma.user.count();
    async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
        try {
            const body = await request.json();

            // Other server logic...
        } catch (error: any) {
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
