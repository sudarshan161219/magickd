import styles from "./downloads.module.css"
import { AiOutlineDownload } from "react-icons/ai"
import { userDownloads } from "../../data/data"
import { Ripple } from "../../components/export"

const Downloads = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}  >Downloads ({userDownloads.length})</h1>
            </div>

            <ul className={styles.downloadsContainer} >
                {userDownloads.map((item, idx) => (
                    <li className={styles.li} key={idx}>
                        <img className={styles.img} src={item.img} alt={item.name} />
                        <Ripple ><AiOutlineDownload className={styles.icon} /></Ripple>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Downloads