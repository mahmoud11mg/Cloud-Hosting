import Link from "next/link";
import styles from "./header.module.css"
import Navbar from "./Navbar";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";

const Header = () => {
  return (  
    <header className={styles.header} >
        <Navbar/>
        <div  className={styles.right}>
        <Link className={styles.btn} href={"/login"}><IoIosLogIn className="mr-2 text-2xl font-bold" /> Login</Link>
        <Link className={`${styles.btn} `} href={"/register"}><IoPersonAddSharp className="mr-2 text-xl font-bold"/> Register</Link>
        </div>
    </header>
  )
}

export default Header