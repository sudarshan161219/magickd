import styles from './intro.module.css'

const Intro = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textconatiner}>
                <h1 className={styles.title}>Designing the Future, <br />One Pixel at a Time.</h1>
                <p className={styles.desc}>
                    {` We're a creative multimedia company that crafts captivating content for all audiences. Additionally, we assist brands and businesses in standing out in the digital age.`}</p>

                <button className={styles.btn}>Explore More</button>
            </div>

            <div className={styles.cardsContainer}>
                <div className={styles.pin_container}>
                    <div className={`${styles.card} ${styles.card_small}`}>
                        <img className={styles.img} src="https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" alt="img" />
                    </div>
                    <div className={`${styles.card} ${styles.card_large}`}>
                        <img className={styles.img} src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="img" />
                    </div>
                    <div className={`${styles.card} ${styles.card_medium}`}>
                        <img className={styles.img} src="https://images.unsplash.com/photo-1618556658017-fd9c732d1360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" alt="img" />
                    </div>
                    <div className={`${styles.card} ${styles.card_medium_medium}`}>
                        <img className={styles.img} src="https://images.unsplash.com/photo-1579543401509-594bf0e610e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="img" />
                    </div>
                    <div className={`${styles.card} ${styles.card_small}`}>
                        <img className={styles.img} src="https://images.unsplash.com/photo-1508161773455-3ada8ed2bbec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="img" />
                    </div>
                    <div className={`${styles.card} ${styles.card_small_small}`}>
                        <img className={styles.img} src="https://images.unsplash.com/photo-1452639608291-23cd58f6864d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80" alt="img" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Intro