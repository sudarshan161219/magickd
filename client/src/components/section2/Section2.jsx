import { Link } from "react-router-dom"
import styles from './section2.module.css'
import { itemData } from "../../data/data"
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { Card } from "../export"

const MainMenu = () => {
    return (
        // <div className={styles.container}>
        //     <div className={styles.cards}>
        //         { itemData.map((item, idx) => (
        //             <Card key={idx} item={item} />
        //         ))}
        //     </div>

        //     <div className={styles.btnContainer} > <Link to="/explore" className={styles.dBtn}>See More</Link></div>
        // </div>
        <Box className={styles.container}>
            <ImageList variant="masonry" cols={NaN} gap={8} className={styles.ImageList} >
                {itemData.map((item, idx) => (

                    <Card key={idx} item={item} />

                ))}
            </ImageList>
            <div className={styles.btnContainer} > <Link to="/explore" className={styles.dBtn}>See More</Link></div>
        </Box>
    )
}

export default MainMenu