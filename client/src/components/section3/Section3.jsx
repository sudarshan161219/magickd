import styles from "./section3.module.css"
import { Link } from "react-router-dom"
import { dummyImgs } from "../../data/data"
import fb from '../../assets/fb.svg'
import insta from "../../assets/insta.svg"
import google from "../../assets/google.svg"
import twitter from "../../assets/x.svg"
import youtube from "../../assets/yt.svg"
import thread from "../../assets/th.svg"

const Section3 = () => {

    return (
        <div className={styles.container} >
            <h1 className={styles.title}>Trusted by the world’s largest companies</h1>
            <div className={styles.imgContainer} >
          
                    <img className={styles.img} src={fb}  alt="img" />
                    <img className={styles.img} src={insta}  alt="img" />
                    <img className={styles.img} src={google}   alt="img"/>
                    <img className={styles.img} src={twitter}   alt="img"/>
                    <img className={styles.img} src={ youtube}  alt="img" />
                    <img className={styles.img} src={thread}   alt="img"/>
  
            </div>
            <div className={styles.infoContainer} >
                <p className={styles.desc}>Need a personalized package for your business?</p>
                <Link className={styles.btn} to="/ContactUs">Request a Quote</Link>
            </div>

        </div>
    )
}

export default Section3