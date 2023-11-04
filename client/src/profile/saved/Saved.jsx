import styles from './saved.module.css'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/Context'
import { Card } from '../../components/export'
import Loading from '../../components/skeletonLoading/Loading'

const Saved = () => {
    const { savedItems, isLoading } = useAppContext()

    return (
        <div className={styles.container}>
            <h1 className={styles.title}  > Saved ({isLoading ? 0 : savedItems.length})</h1>
            {
                isLoading ?
                    <div className={styles.container}>
                        <div className={styles.cards}>
                            <Loading />
                        </div>
                    </div>
                    :
                    <div className={styles.cards}>
                        {savedItems.map((item, idx) => (
                            <Card key={idx} item={item} />
                        ))}
                    </div>
            }
        </div>
    )
}

export default Saved