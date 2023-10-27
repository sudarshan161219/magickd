import styles from "./cards.module.css"
import { AiOutlineHeart, AiOutlineDownload } from "react-icons/ai"
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line react/prop-types
const Card = ({ item }) => {
    return (
        <div className={styles.card}>
            <div className={styles.topoverlay} >
                <IconButton  color="primary" aria-label="add to shopping cart">
                    <AiOutlineHeart className={styles.icon} />
                </IconButton>

                <IconButton  color="primary" aria-label="add to shopping cart">
                    <AiOutlineDownload className={styles.icon} />
                </IconButton>
            </div>
            <img className={styles.img} src={item.imageUrl} alt={item.name} />
            <div className={styles.overlay} >
                <IconButton  color="primary" aria-label="add to shopping cart">
                    <p className={styles.p}>buy</p>
                </IconButton>
            </div>
        </div>
    )
}

export default Card