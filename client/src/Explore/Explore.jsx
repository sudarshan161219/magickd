import styles from "./explore.module.css"
import { BsSearch } from "react-icons/bs"
import { Card } from "../components/export"
import { dataArrr } from "../data/data"
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
const Explore = () => {
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <div className={styles.filter}>Filter</div>
                <input type="text" className={styles.input} placeholder="Search" />
                <button className={styles.btn} ><BsSearch className={styles.icon} /></button>
            </div>

            <div className={styles.cards}>
                {dataArrr.map((item, idx) => (
                    <Card key={idx} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Explore