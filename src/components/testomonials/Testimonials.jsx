import styles from "./testimonial.module.css"
import { testimonials } from "../../data/data"
import {
    BiSolidQuoteAltLeft,
    BiSolidQuoteAltRight
}
    from "react-icons/bi"
const Testimonials = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>What people say?</h1>
            <div className={styles.cards}>
                {testimonials.map((item, idx) => (
                    <div key={idx} className={styles.card} >
                        <p className={styles.text}> <BiSolidQuoteAltLeft className={styles.icon} /> {item.text} <BiSolidQuoteAltRight className={styles.icon} /></p>
                        <div className={styles.spanContainer} >
                            <span className={styles.name}>-{item.name}</span>
                            <span className={styles.shopName}>{item.shopName}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Testimonials