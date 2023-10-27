import styles from "./loading.module.css"
import loading from "../../assets/loading.svg"
const Loading = () => {
    return (
        <div className={styles.container}>
            <img className={styles.img} src={loading} alt="Loading..." />
        </div>
    )
}

export default Loading