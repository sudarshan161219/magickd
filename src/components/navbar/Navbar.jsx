import { Link } from "react-router-dom";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.svg"
import { useAppContext } from "../../context/Context";
import { BiMenu } from "react-icons/bi"
import SidebarNav from "../sideBarNav/SidebarNav"


const Navbar = () => {
  const { toggleMenu, toggleMenuFn } = useAppContext()
  const [scrollPosition, setScrollPosition] = useState(0);


  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }


  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleMenu]);


  return (
    <nav
      className={
        `${scrollPosition > 100 ? ` ${styles.stickyNav}` : `${styles.container}`}`
      }>

      <div className={styles.LogoContainer}>
        <BiMenu onClick={toggleMenuFn} className={styles.icon} />
        <Link to="/" ><img className={styles.logo} src={logo} alt="logo" /></Link>
      </div>


      <div className={styles.loginProfileContainer}  >
        <button className={`${styles.btn} ${styles.login}`}>Log in</button>
        <button className={`${styles.btn} ${styles.signin}`}>Sign in</button>
      </div>

      < SidebarNav />
      <div className={`${toggleMenu ? `${styles.show} ${styles.bg}` : `${styles.bg}`}   `} ></div>
    </nav>
  )
}

export default Navbar