import styles from "./sidebarnav.module.css"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { AiOutlineClose } from "react-icons/ai"
import { Ripple } from "../../components/export"
import { useAppContext } from "../../context/Context";



const SidebarNav = () => {
    const { toggleMenu, toggleMenuFn } = useAppContext()

    return (
        <div className={styles.container}>
            <div className={`${toggleMenu ? `${styles.showBg}  ${styles.bg}` : `${styles.bg}`}`}></div>
            <div className={`${toggleMenu ? `${styles.showsidebar}  ${styles.sidebar}` : `${styles.sidebar}`}`}>
                <div className={styles.nav} >
                    <div className={styles.closeContainer} >
                        <Ripple ><AiOutlineClose onClick={toggleMenuFn} className={styles.icon} /></Ripple>
                        <img className={styles.logo} src={logo} alt="magickd" />

                    </div>
                </div>

                <div className={styles.menu} >
                    <ul className={styles.ul}>
                        <li ><Link onClick={toggleMenuFn} className={styles.link} to="/">Home</Link> </li>
                        {/* <li ><Link onClick={toggleMenuFn} className={styles.link} to="/Portfolio">Portfolio</Link> </li>
                        <li ><Link onClick={toggleMenuFn} className={styles.link} to="/Blog">Blog</Link> </li> */}
                        <li ><Link onClick={toggleMenuFn} className={styles.link} to="/AboutUs">About Us</Link> </li>
                        <li ><Link onClick={toggleMenuFn} className={styles.link} to="/ContactUs">Contact Us</Link> </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SidebarNav