import styles from './saved.module.css'
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai"
import { userFav } from "../../data/data"
import { Ripple } from "../../components/export"

const Saved = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}  >Saved ({userFav.length})</h1>
            </div>

            <ul className={styles.savedContainer} >
                {userFav.map((item, idx) => (
                    <li className={styles.li} key={idx}>
                        <img className={styles.img} src={item.img} alt={item.name} />

                        <div className={styles.iconContainerF}>
                            <Ripple > <AiOutlineDelete className={styles.icon} /></Ripple>
                            <Ripple > <AiOutlineDownload className={styles.icon} /></Ripple>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Saved