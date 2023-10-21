import styles from "./cards.module.css"
import { AiOutlineHeart, AiOutlineDownload } from "react-icons/ai"
import ImageListItem from '@mui/material/ImageListItem';
// eslint-disable-next-line react/prop-types
const Card = ({ item }) => {
    return (
        // eslint-disable-next-line react/prop-types
        <ImageListItem key={item.img}>
            <img
                // eslint-disable-next-line react/prop-types
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                // eslint-disable-next-line react/prop-types
                src={`${item.img}?w=248&fit=crop&auto=format`}
                // eslint-disable-next-line react/prop-types
                alt={item.title}
                loading="lazy"
            />
            <div className={styles.btnIconContainer} >
                <button className={styles.btn}> <AiOutlineHeart className={`${styles.icons} ${styles.heart}`} /> </button>
                <button className={styles.btn}> <AiOutlineDownload className={`${styles.icons} ${styles.download}`} /> </button>
            </div>
        </ImageListItem>
    )
}

export default Card