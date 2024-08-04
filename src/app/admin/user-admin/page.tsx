// app/page.tsx

import { cookies } from "next/headers";
import AdminUserTable from "./AdminUserTable";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import AdminUsersTable from "./AdminUserTable";
import { ToastContainer } from "react-toastify";


const Page = async () => {
   return (
    <div>
        <AdminUsersTable/>
       
    </div>
  );
};

export default Page;
