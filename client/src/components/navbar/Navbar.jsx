import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import { useAppContext } from "../../context/Context";
import { BiMenu } from "react-icons/bi"


const Navbar = () => {
  const { toggleMenu, toggleProfileMenu, toggleMenuFn, toggleProfileMenuFn } = useAppContext()
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation()

  const auth = true

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    if (toggleMenu || toggleProfileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleMenu, toggleProfileMenu]);

  if (location.pathname === "/admin/9902576816064162248089752424640/36211454745473623543649735436497/auth" || location.pathname === "/admin/9902576816064162248089752424640/43404787354362343955343952478723/panel") {
    return null
  }

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
        <ul className={styles.ul}>
          <li className={styles.li}> <Link to="/" className={styles.link}>Home</Link> </li>
          <li className={styles.li}> <Link to="/Portfolio" className={styles.link}>Portfolio</Link> </li>
          <li className={styles.li}> <Link to="/Blog" className={styles.link}>Blog</Link> </li>
          <li className={styles.li}> <Link to="/AboutUs" className={styles.link}>About Us</Link> </li>
          <li className={styles.li}> <Link to="/ContactUs" className={styles.link}>Contact Us</Link> </li>
        </ul>
        {auth ? <div onClick={toggleProfileMenuFn} className={styles.plink} to="/user-profile" ><img className={styles.Plogo} src="https://api.dicebear.com/6.x/adventurer/svg?seed=Cuddles" alt="user name" /></div> :

          <Link to="/register" className={`${styles.btn} ${styles.login}`}>Log in</Link>
        }

      </div>
    </nav>
  )
}

export default Navbar