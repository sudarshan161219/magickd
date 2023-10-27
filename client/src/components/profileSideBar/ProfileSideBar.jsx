import { Link } from "react-router-dom"
import styles from "./profilesidebar.module.css"
import { AiOutlineClose, AiOutlineHeart, AiOutlineDownload, AiOutlineLogout } from "react-icons/ai"
import { MdManageAccounts } from "react-icons/md"
import { Ripple } from "../../components/export"
import { useAppContext } from "../../context/Context"


const ProfileSideBar = () => {

    const { toggleProfileMenu, toggleProfileMenuFn, user, logoutUser, QlogoutUser } = useAppContext()
    // const { name, userImg } = user

    const handleLogout = () => {
        logoutUser()
        toggleProfileMenuFn()
    }


    const handleQLogout = () => {
        QlogoutUser ()
        toggleProfileMenuFn()
    }


    if (!user) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={`${toggleProfileMenu ? `${styles.showBg}  ${styles.bg}` : `${styles.bg}`}`}></div>
            <div className={`${toggleProfileMenu ? `${styles.showsidebar}  ${styles.sidebar}` : `${styles.sidebar}`}`}>
                <div className={styles.nav} >
                    <div className={styles.closeContainer} >
                        <Ripple ><AiOutlineClose onClick={toggleProfileMenuFn} className={styles.icon} /></Ripple></div>


                    <div className={styles.profileInfoContainer} >
                        <img className={styles.userImg} src={user.userImg} alt={name} />
                        <div className={styles.userIno} >
                            <h2 className={styles.title}>{user.name}</h2>
                            <p className={styles.desc}>user ID: xxxxxxxxxx</p>
                        </div>
                    </div>
                </div>

                <div className={styles.menu} >
                    <ul className={styles.ul}>
                        <li className={styles.li}> <Link onClick={toggleProfileMenuFn} className={styles.link} to="/user-profile" > <MdManageAccounts className={styles.icon} /> Account details</Link> </li>
                        <li className={styles.li}> <Link onClick={toggleProfileMenuFn} className={styles.link} to="/user-profile/saved" > <AiOutlineHeart className={styles.icon} /> Saved</Link> </li>
                        <li className={styles.li}> <Link onClick={toggleProfileMenuFn} className={styles.link} to="/user-profile/downloads" >  <AiOutlineDownload className={styles.icon} />  Downloads</Link> </li>
                        {
                            user.method === 'LocalAuth' ?

                                <li className={styles.li}>
                                    <Link onClick={handleLogout} className={styles.link} to="/" >
                                        <AiOutlineLogout className={styles.icon} /> Log out</Link>
                                </li>
                                :

                                <li className={styles.li}>
                                    <Link onClick={ handleQLogout} className={styles.link} to="/" >
                                        <AiOutlineLogout className={styles.icon} /> Log out</Link>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileSideBar