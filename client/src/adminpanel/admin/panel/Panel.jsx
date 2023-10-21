import styles from "./panel.module.css"
import { Link } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { AdminSidebar } from "../../../components/export"
import {
    AiOutlineClose,
    AiOutlineMenu
} from "react-icons/ai"
import { useAppContext } from "../../../context/Context"

const Panel = () => {
    const { toggleAdminMenu, toggleAdminMenuFn } = useAppContext()

    return (
        <div className={styles.container}>
            < AdminSidebar />
            <div className={styles.header} >

                <div className={styles.logoIconContainer}>
                    < AiOutlineMenu onClick={toggleAdminMenuFn} className={styles.icon} />
                    <img className={styles.img} src={logo} alt="magickd.com" />
                </div>

                <div>
                    <h1>hey, admin 👋🏻</h1>
                </div>
            </div>



        </div>
    )
}

export default Panel