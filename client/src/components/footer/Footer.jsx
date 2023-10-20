import styles from "./footer.module.css"
import { useLocation } from "react-router-dom";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation()


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


  if (location.pathname === "/admin/9902576816064162248089752424640/36211454745473623543649735436497/auth" || location.pathname === "/admin/9902576816064162248089752424640/43404787354362343955343952478723/panel") {
    return null
  }


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