import styles from "./paymentsuccess.module.css"
import logo from "../../assets/logo.png"
import success1 from "../../assets/success1.gif"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const PaymentSuccess = () => {


    const query = useSearchParams()[0]
    const refrence = query.get("reference")
    return (
        <div className={styles.container}>

            <div className={styles.boxContainer}>

                <div className={styles.imgContainer}>
                    <img src={logo} className={styles.img} alt="magickd" />
                    <h1 className={styles.title}>Payment Successfull</h1>
                </div>

                <div className={styles.box}>
                    <img className={styles.gif} src={success1} alt="Payment Successfull" />
                    <span className={styles.span}>Reference No: {refrence}</span>
                </div>

                <Link to="/" className={styles.btn} >Go To Home</Link>

            </div>

        </div>
    )
}

export default PaymentSuccess