"use client"
import Link from "next/link";
import styles from "./header.module.css"
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const [toggel, setToggle]= useState(false);

  return (
        <nav className={styles.navbar}>
            <div>
                <Link href={"/"}  className={`${styles.logo} hover:animate-pulse`} >
                CLOUD <GrTechnology /> HOSTING  </Link>
            </div>
            <div className={styles.menu}>
          {toggel ? (<IoCloseSharp 
          onClick={() => setToggle(prev => !prev)}/>) : ( <AiOutlineMenu onClick={() => setToggle(prev => !prev)}/>)}
            </div>
        <div 
        className={styles.navLinksWrapper} 
      style={{
        clipPath: toggel && "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" || ""
      }}
        >
          <ul className={styles.navLinks} >
            <Link onClick={() => setToggle(false)}  className={styles.navLink}  href={"/"}>Home</Link>
            <Link onClick={() => setToggle(false)}  className={styles.navLink}  href={"/articles?pageNumber=1"}>Articles</Link>
            <Link onClick={() => setToggle(false)}  className={styles.navLink} href={"/about"}>About</Link> 
            <Link onClick={() => setToggle(false)}  className={styles.navLink} href={"/admin"}>Admin Dashboard</Link>
         </ul>
       </div>
    </nav>

  )
}

export default Navbar