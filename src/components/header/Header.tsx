import Link from "next/link";
import styles from "./header.module.css"
import Navbar from "./Navbar";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogOutButton from "./LogOutButton";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const paylod = verifyTokenForPage(token);

  return (
    <header className={styles.header}>
      <Navbar isAdmin={paylod?.isAdmin || false} />
      <div className={styles.right}>
        {paylod ? (
          <>
           {paylod?.isAdmin && <MdAdminPanelSettings className="ml-2 text-3xl font-bold text-sky-700" /> }
            <strong className="text-sky-800 font-bold md:text-xl capitalize">
              {paylod?.username}
            </strong>
           
            <LogOutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href={"/login"}>
              <IoIosLogIn className="mr-2 text-2xl font-bold" /> Login
            </Link>
            <Link className={`${styles.btn}`} href={"/register"}>
              <IoPersonAddSharp className="mr-2 text-xl font-bold" /> Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
