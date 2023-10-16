import styles from "./sidebarnav.module.css"
import logo from "../../assets/logo.png"
import { GrFormClose } from "react-icons/gr"
import { useAppContext } from "../../context/Context";



const SidebarNav = () => {
    const { toggleMenu, toggleMenuFn } = useAppContext()

    return (
        <div className={`${toggleMenu ? `${styles.show} ${styles.container}` : `${styles.container}`}   `}>
            <nav className={styles.LogoContainer}>
                <GrFormClose onClick={toggleMenuFn} className={styles.icon} />
                <img className={styles.logo} src={logo} alt="logo" />
            </nav>
        </div>
    )
}

export default SidebarNav