import { Link } from "react-router-dom"
import styles from './section2.module.css'
import { useAppContext } from "../../context/Context"
import { Card } from "../export"
import { useEffect } from "react"
import Loading from "../skeletonLoading/Loading"
import load from "../../assets/loading.webp"

const MainMenu = () => {

    const { getProductFn, products, isLoading, user } = useAppContext()

    useEffect(() => {
        getProductFn()
    }, [user])

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.cards}>
                    <Loading />
                    {/* <div className={styles.card}>
                        <img className={styles.img} src={load} alt="loading..." />
                    </div> */}

                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {products.map((item, idx) => (
                    <Card key={idx} item={item} />
                ))}
            </div>
            <img loading="lazy" src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=299031086409524&height=200&width=200&ext=1701197524&hash=AeT4gE8WsEMqmlK3NuE" alt="" />
            <div className={styles.btnContainer} > <Link to="/explore" className={styles.dBtn}>See More</Link></div>
        </div>
    )
}

export default MainMenu