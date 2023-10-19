import styles from "./profile_2.module.css"
import { userPurchasehistory } from "../../data/data"
import {AiOutlineHistory} from "react-icons/ai"


const Profile_2 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.userInfoContainer}>
                <h2 className={styles.title}>Purchase history</h2>
                <table className={styles.table} >
                    <ul className={styles.ulTable}>
                        <li className={styles.liText} >name</li>
                        <li className={styles.liText} >Date</li>
                        <li className={ styles.liText} >Total price</li>
                        <li className={ styles.liText} >Payment type</li>
                    </ul>
                    {userPurchasehistory.map((item, idx) => {
                        const { n, date, total, PaymentType } = item
                        return (
                            <div className={styles.ul} key={idx}>
                                <div className={styles.li} >{n}</div>
                                <div className={styles.li} >{date}</div>
                                <div className={styles.li} >{total}</div>
                                <div className={styles.li}>{PaymentType}</div>
                            </div>
                        )
                    })}
                </table>
                {/* <div className={styles.msg}><h3 className={styles.msgHeading}>No previous purchase history.</h3> <AiOutlineHistory className={styles.icon} /> </div> */}

            </div>
        </div>
    )
}

export default Profile_2