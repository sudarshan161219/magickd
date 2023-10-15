import styles from './intro.module.css'

const Intro = () => {
    return (
        <div className={styles.container}>
                <div className={styles.textconatiner}>
                    <h1 className={styles.title}>WELCOME TO MAGICKD.</h1>
                    <p className={styles.desc}>We Are a Multimedia Company which Produce Creative Breathtaking Content for the Audience and We also Help Brands & Businesses Gain a Competitive Advantage in the Connected World.</p>
                </div>
        </div>
    )
}

export default Intro