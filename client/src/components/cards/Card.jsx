import styles from "./cards.module.css"
import { AiOutlineHeart, AiOutlineDownload } from "react-icons/ai"

// eslint-disable-next-line react/prop-types
const Card = ({item}) => {
    return (
        <div className={styles.card} >
        <div className={styles.imgContainer} >
            <img className={styles.img} src={item.img} alt={item.name} />
            <div className={styles.btnIconContainer} >
                <button className={styles.btn}> <AiOutlineHeart className={`${styles.icons} ${styles.heart}`} /> </button>
                <button className={styles.btn}> <AiOutlineDownload className={`${styles.icons} ${styles.download}`} /> </button>
            </div>
        </div>
    </div>
    )
}

export default Card