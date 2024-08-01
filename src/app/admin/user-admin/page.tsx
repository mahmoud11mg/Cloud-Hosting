// app/page.tsx

import { cookies } from "next/headers";
import AdminUserTable from "./AdminUserTable";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import AdminUsersTable from "./AdminUserTable";
import { ToastContainer } from "react-toastify";


const Page = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
   return (
    <div>
        <AdminUsersTable/>
       
    </div>
  );
};

export default Page;
