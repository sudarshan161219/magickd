import styles from "./index.module.css"
import { Link } from "react-router-dom"
import notFound from "../../assets/not_found.svg"


const NotFound = () => {
    return (
        <div className={styles.container}>
            <img className={styles.img} src={notFound} alt="not found" />

            <div className={styles.btnContainer} > <Link to="/" className={styles.dBtn}>Back to Home</Link></div>
        </div>
    )
}

export default NotFound