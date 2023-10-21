import styles from "./adminSidebar.module.css"
import logo from "../../assets/logo.png"
import { AiOutlineClose } from "react-icons/ai"
import { Ripple } from "../../components/export"
import { useAppContext } from "../../context/Context";
import { MdOutlineManageAccounts } from "react-icons/md"
import { GrAddCircle } from "react-icons/gr"
import { BsBoxSeam } from "react-icons/bs"
import { Link } from "react-router-dom"
import { FiUsers } from "react-icons/fi"
import { AiOutlineLogout } from "react-icons/ai"


const AdminSidebar = () => {
    const { toggleAdminMenu, toggleAdminMenuFn } = useAppContext()
    return (
        <div className={styles.container}>
            <div className={`${toggleAdminMenu ? `${styles.showBg}  ${styles.bg}` : `${styles.bg}`}`}></div>
            <div className={`${toggleAdminMenu ? `${styles.showsidebar}  ${styles.sidebar}` : `${styles.sidebar}`}`}>
                <div className={styles.nav} >
                    <div className={styles.closeContainer} >
                        <Ripple ><AiOutlineClose onClick={toggleAdminMenuFn} className={styles.icon} /></Ripple>
                        <img className={styles.logo} src={logo} alt="magickd" />

                    </div>
                </div>

                <div className={styles.menu} >
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <Link onClick={toggleAdminMenuFn} to="/admin/99025773623568154745460635436441622443649708975362114242464" className={styles.link}>
                                <MdOutlineManageAccounts className={styles.icons} />General
                            </Link>
                        </li>

                        <li className={styles.li}>
                            <Link onClick={toggleAdminMenuFn} to="/admin/99025773623568154745460635436441622443649708975362114242464/add_item" className={styles.link}>
                                <GrAddCircle className={styles.icons} /> Add Item
                            </Link>
                        </li>

                        <li className={styles.li}>
                            <Link onClick={toggleAdminMenuFn} to="/admin/99025773623568154745460635436441622443649708975362114242464/my_item" className={styles.link}>
                            <BsBoxSeam className={styles.icons} /> My Items
                            </Link>
                        </li>

                        <li className={styles.li}>
                            <Link onClick={toggleAdminMenuFn} to="/admin/99025773623568154745460635436441622443649708975362114242464/users" className={styles.link}>
                            <FiUsers className={styles.icons} /> Users
                            </Link>
                        </li>

                        <li className={styles.li}>
                            <AiOutlineLogout className={styles.icons} />Log out
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar