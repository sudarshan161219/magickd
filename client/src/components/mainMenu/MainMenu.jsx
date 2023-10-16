import { Link } from 'react-router-dom'
import styles from './Main.module.css'
import {dataArr} from "../../data/data"


const MainMenu = () => {
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {dataArr.map((item, idx) => (
                    <div className={styles.card} key={idx}>
                        <div className={styles.imgContainer} >
                            <img className={styles.img} src={item.img} alt={item.name} />
                            <div className={styles.textContainer} >
                                <h1 className={styles.heading}>{item.name}</h1>
                                <Link className={styles.link} to="/discover" >discover more</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainMenu