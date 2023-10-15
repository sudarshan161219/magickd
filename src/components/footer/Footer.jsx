import styles from "./footer.module.css"
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import{BsFacebook} from "react-icons/bs"

const Footer = () => {
  const currentYear = new Date().getFullYear();


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
    },
    {
      icon: <AiOutlineYoutube className={styles.icons} />,
      link: "https://www.youtube.com/channel/UCI6p6prAF85a3XMtpq29QKg?view_as=subscriber",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h5 className={styles.footerTitle}>Copyright {currentYear} - MAGICKD</h5>

        <div className={styles.socialConatiner} >
          <ul className={styles.ul}>
            {socialLinks.map((item, idx) => (
              <li key={idx}><a target="_blank" href={item.link} rel="noreferrer">{item.icon}</a></li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Footer