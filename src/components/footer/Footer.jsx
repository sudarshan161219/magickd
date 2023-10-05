import styles from "./footer.module.css"


const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <div className={styles.container}>
      <h5 className={styles.footerTitle}>Copyright {currentYear} - Sudarshan Hosalli</h5>
    </div>
  )
}

export default Footer