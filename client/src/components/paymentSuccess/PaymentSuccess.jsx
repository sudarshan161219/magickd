import styles from "./paymentsuccess.module.css"
import logov1 from "../../assets/logov1.webp"
import logov2 from "../../assets/logov2.webp"
import success1 from "../../assets/success1.gif"
import success from "../../assets/Successful purchase-bro.svg"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';


const PaymentSuccess = () => {

    const query = useSearchParams()[0]
    const refrence = query.get("reference")
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // This will navigate back to the previous page.
    };


    const theme = localStorage.getItem("theme")


    return (
        <div className={styles.container}>

            <div className={styles.boxContainer}>

                <div className={styles.imgContainer}>
                    <img className={styles.img} src={theme === 'light' ? logov2 : logov1} alt="magickd" />
                    <h1 className={styles.title}>Payment Successfull</h1>
                </div>

                <div className={styles.box}>

                    <img className={styles.gif} src={ success} alt="Payment Successfull" />
                    <span className={styles.span}>Reference No: {refrence}</span>
                </div>

                <button onClick={goBack} className={styles.btn}>Go Back</button>
            </div>

        </div>
    )
}

export default PaymentSuccess