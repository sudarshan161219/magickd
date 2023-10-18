import { Link } from "react-router-dom"
import styles from "./profilesidebar.module.css"
import { AiOutlineClose, AiOutlineHeart, AiOutlineDownload, AiOutlineLogout } from "react-icons/ai"
import { MdManageAccounts } from "react-icons/md"
import { Ripple } from "../../components/export"
import { useAppContext } from "../../context/Context"

const ProfileSideBar = () => {

    const { toggleProfileMenu, toggleProfileMenuFn } = useAppContext()

    return (
        <div className={styles.container}>
            <div className={`${toggleProfileMenu ? `${styles.showBg}  ${styles.bg}` : `${styles.bg}`}`}></div>
            <div className={`${toggleProfileMenu ? `${styles.showsidebar}  ${styles.sidebar}` : `${styles.sidebar}`}`}>
                <div className={styles.nav} >
                    <div className={styles.closeContainer} >
                        <Ripple ><AiOutlineClose onClick={toggleProfileMenuFn} className={styles.icon} /></Ripple></div>


                    <div className={styles.profileInfoContainer} >
                        <img className={styles.userImg} src="https://api.dicebear.com/6.x/adventurer/svg?seed=Cuddles" alt="user name" />
                        <div className={styles.userIno} >
                            <h2 className={styles.title}>Sudarshan</h2>
                            <p className={styles.desc}>user ID: xxxxxxxxxx</p>
                        </div>
                    </div>
                </div>

                <div className={styles.menu} >
                    <ul className={styles.ul}>
                        <li className={styles.li}> <Link className={styles.link} to="/" > <MdManageAccounts className={styles.icon} /> Account details</Link> </li>
                        <li className={styles.li}> <Link className={styles.link} to="/" > <AiOutlineHeart className={styles.icon} /> Saved</Link> </li>
                        <li className={styles.li}> <Link className={styles.link} to="/" >  <AiOutlineDownload className={styles.icon} />  Downloads</Link> </li>
                        <li className={styles.li}> <Link className={styles.link} to="/" > <AiOutlineLogout className={styles.icon} /> Log out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileSideBar