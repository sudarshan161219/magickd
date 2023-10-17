import {Link } from "react-router-dom"
import styles from './section1.module.css'

const Intro = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textconatiner}>
                <h1 className={styles.title}>Designing the Future, <br />One Pixel at a Time.</h1>
                <p className={styles.desc}>
                    {` We're a creative multimedia company that crafts captivating content for all audiences. Additionally, we assist brands and businesses in standing out in the digital age.`}</p>

                <Link to="/explore" className={styles.btn}>Explore More</Link>
            </div>

            <div className={styles.imgContainer}>
                <img className={styles.img} src="https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="" />
            </div>
        </div>
    )
}

export default Intro