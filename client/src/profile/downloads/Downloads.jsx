
import { Link } from 'react-router-dom';
import styles from "./downloads.module.css"
import { Card } from '../../components/export'
import { useAppContext } from "../../context/Context"
import Loading from '../../components/skeletonLoading/Loading'


const Downloads = () => {
    const {purchasedItems, isLoading } = useAppContext()


    return (
        <div className={styles.container}>
            <h1 className={styles.title}  >Download ({isLoading ? 0 : purchasedItems.length})</h1>
            {
                isLoading ?
                    <div className={styles.container}>
                        <div className={styles.cards}>
                            <Loading />
                        </div>
                    </div>
                    :
                    <div className={styles.cards}>
                        {purchasedItems.map((item, idx) => (
                    <Card key={idx} item={item} />
                        ))}
                    </div>
            }
        </div>
    )
}

export default Downloads