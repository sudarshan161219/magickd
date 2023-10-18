import styles from "./sidebarnav.module.css"
import logo from "../../assets/logo.png"
import { AiOutlineClose} from "react-icons/ai"
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
                        <img className={styles.logo} src={logo} alt="magickd" />
                        <Ripple ><AiOutlineClose onClick={toggleMenuFn} className={styles.icon} /></Ripple></div>
                </div>

                <div className={styles.menu} >
                    <ul className={styles.ul}>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SidebarNav