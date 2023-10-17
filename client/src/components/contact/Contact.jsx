import styles from "./contact.module.css"
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai"
import { MdOutlineLocationOn } from "react-icons/md"
import { BsFacebook } from "react-icons/bs"

const Contact = () => {

  const socialLinks = [
    {
      icon: <BsFacebook className={styles.icons} />,
      link: "https://www.facebook.com/magickdcompany/",
    },
    {
      icon: <AiOutlineTwitter className={styles.icons} />,
      link: "https://twitter.com/Magickdcompany",
    },
    {
      icon: <AiOutlineInstagram className={styles.icons} />,
      link: "https://www.instagram.com/magickdcompany/",
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer} >
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.desc}>Any question or remarks? Just write us a message!</p>
      </div>
      <div className={styles.formContainer} >
        <div className={styles.section_one}>
          <div className={styles.group}>
            <input name='firstName' className={styles.input} type="text" required />
            <span className={styles.bar}></span>
            <label className={styles.label}>First Name</label>
          </div>

          <div className={styles.group}>
            <input name='lastName' className={styles.input} type="text" required />
            <span className={styles.bar}></span>
            <label className={styles.label}>Last Name</label>
          </div>

          <div className={styles.group}>
            <input name='email' className={styles.input} type="text" required />
            <span className={styles.bar}></span>
            <label className={styles.label}>Email Address</label>
          </div>

          <div className={styles.group}>
            <textarea name='message' className={`${styles.input} ${styles.textarea}`} type="text" required />
            <span className={styles.bar}></span>
            <label className={styles.label}>Message</label>
          </div>

          <div className={styles.btnContainer}>
            <button className={styles.btn} >Send Message</button>
          </div>

        </div>
        <div className={styles.section_two}>

          <div className={styles.titleContainer} >
            <h2 className={styles.secTitle}>Contact Information</h2>
            <p className={styles.desc}>please contact us via following methods</p>
          </div>

          <div className={styles.contactInfoContainer}>
            <AiOutlinePhone className={styles.icons} />
            <a className={styles.links} href="tel:09764688572">09764688572</a>
          </div>
          <div className={styles.contactInfoContainer}>
            < AiOutlineMail className={styles.icons} />
            <a className={styles.links} href="mailto: magickdcompany@gmail.com">magickdcompany@gmail.com</a>
          </div>
          <div className={styles.contactInfoContainer}>
            <MdOutlineLocationOn className={styles.icons} />
            <span className={styles.links}>Mumbai, Maharashtra, India</span>
          </div>

          <div className={styles.socialConatiner} >
            <ul className={styles.ul}>
              {socialLinks.map((item, idx) => (
                <li className={styles.li} key={idx}><a target="_blank" className={styles.sicon} href={item.link} rel="noreferrer">{item.icon}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Contact