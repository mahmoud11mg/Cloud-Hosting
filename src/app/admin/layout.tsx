import { cookies } from "next/headers";
import AdminSidebar from "./AdminSidebar"
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
interface AdminDachboardLayoutProps {
    children: React.ReactNode;
}


export const metadata: Metadata = {
  title: "Admin Dachboard",
  description: "Cloud Hosing Project",
  icons:{
    icon:"/favicon.ico"
    
  }
};

const AdminDachboardLayout = ({children}:AdminDachboardLayoutProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
  return (
        <div className="overflow-height flex items-start justify-between overflow-hidden ">
        <div className="overflow-height w-15  lg:w-1/5 bg-sky-500 text-white p-1 lg:p-5">
            <AdminSidebar/>
        </div>

        <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
            {children}
        </div>
    </div>
  )
}

export default AdminDachboardLayout