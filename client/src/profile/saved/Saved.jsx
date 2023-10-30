import styles from './saved.module.css'
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai"
import { userFav } from "../../data/data"
import { Ripple } from "../../components/export"
import { useAppContext } from '../../context/Context'
import { Card } from '../../components/export'
import { useEffect } from 'react'

const Saved = () => {
    const { getSavedProductFn, savedItems } = useAppContext()

    useEffect(() => {
        getSavedProductFn()
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}  >Saved ({savedItems.length})</h1>
            </div>
            {/* 
            {savedItems.length === 0 ?

                <h1>No items </h1> : */}

            <div className={styles.cards}>
                {savedItems.map((item, idx) => (
                    <Card item={item} key={idx} />
                ))}
            </div>
            {/* // } */}

        </div>
    )
}

export default Saved