import { Link } from "react-router-dom"
import styles from './section2.module.css'
import { dataArr } from "../../data/data"

import { Card } from "../export"

const MainMenu = () => {
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {dataArr.map((item, idx) => (
                    <Card key={idx} item={item} />
                ))}
            </div>

            <div className={styles.btnContainer} > <Link to="/explore" className={styles.dBtn}>See More</Link></div>
        </div>
    )
}

export default MainMenu