import styles from './saved.module.css'
import { Link } from 'react-router-dom';
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai"
import { useAppContext } from '../../context/Context'
import { Card } from '../../components/export'
import { useEffect } from 'react'
import Loading from '../../components/skeletonLoading/Loading'

const Saved = () => {
    const { getSavedProductFn, savedItems, isLoading } = useAppContext()

    useEffect(() => {
        getSavedProductFn()
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}  > Saved ({isLoading ? 0 : savedItems.length})</h1>
            </div>


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
                                            <Link key={idx} to={`/item/${item._id}`} ><Card item={item} /></Link>
                        ))}
                    </div>

            }



        </div>
    )
}

export default Saved