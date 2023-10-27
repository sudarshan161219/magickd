import { Link } from "react-router-dom"
import styles from './section2.module.css'
import { useAppContext } from "../../context/Context"
import { Card } from "../export"
import { useEffect } from "react"

const MainMenu = () => {

    const { getProductFn, products } = useAppContext()

    useEffect(() => {
        getProductFn()
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {products.map((item, idx) => (
                    <Card key={idx} item={item} />
                ))}
            </div>

            <div className={styles.btnContainer} > <Link to="/explore" className={styles.dBtn}>See More</Link></div>
        </div>
    )
}

export default MainMenu