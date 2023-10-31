import styles from "./section3.module.css"
import { Link } from "react-router-dom"
import { dummyImgs } from "../../data/data"
const Section3 = () => {
    return (
        <div className={styles.container} >
            <h1 className={styles.title}>Trusted by the world’s largest companies</h1>
            <div className={styles.imgContainer} >
                {dummyImgs.map((item, idx) => (
                    <img className={styles.img} src={item.img} alt={item.name} key={idx} />
                ))}
            </div>


            <div className={styles.infoContainer} >
                <p className={styles.desc}>Need a personalized package for your business?</p>
                <Link className={styles.btn} to="/ContactUs">Request a Quote</Link>
            </div>

        </div>
    )
}

export default Section3