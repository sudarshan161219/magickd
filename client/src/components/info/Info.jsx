import  { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineHeart, AiOutlineDownload, AiTwotoneHeart } from "react-icons/ai";
import { Chip } from '@mui/material';
import styles from "../infoProduct/Infoproduct.module.css"
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/Context";

// eslint-disable-next-line react/prop-types
const Info = ({ singleProduct }) => {
    const { user } = useAppContext();

    const [saved, setSaved] = useState(false);
    const [isLOading, setIsLOading] = useState(false);

    // eslint-disable-next-line react/prop-types
    const {imageUrl, name, description, category, tags, price, purchase, driveName, driveId, savedByUsers} = singleProduct
    const saveProductFn = async () => {
        setIsLOading(true);

        try {
            await axios.post(`/api/save/${id}`);
            setIsLOading(false);
            setSaved(true);
            toast.success("Item saved.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsLOading(false);
        }
    };

    const unsaveProductFn = async () => {
        setIsLOading(true);

        try {
            await axios.post(`/api/unsave/${id}`);
            setIsLOading(false);
            setSaved(false);
            toast.success("Item removed.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsLOading(false);
        }
    };


    const handleSave = () => {
        if (saved) {
            unsaveProductFn();
        } else {
            saveProductFn();
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (savedByUsers.includes(user && user._id)) {
            setSaved(true)
        } else {
            setSaved(false)
        }
    }, [])
    return (
        <>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src={imageUrl} alt={name} />
                </div>
                <div className={styles.thriContainer}>
                    <div className={styles.textContainer}>
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                    <div className={styles.categoryContainer}>
                        <Chip label={category} variant="outlined" />
                    </div>
                    <div className={styles.btnContainer}>
                        {saved ? (
                            <button onClick={handleSave}>

                                {isLOading ?
                                    <img src={gif} className={styles.btnGif} alt="loading" /> :

                                    <AiTwotoneHeart className={`${styles.icon} ${styles.heart}`} />
                                }

                                {isLOading ? null : ' Saved'}

                            </button>
                        ) : (
                            <button onClick={handleSave}>
                                {isLOading ?
                                    <img src={gif} className={styles.btnGif} alt="loading" /> :

                                    <AiOutlineHeart className={styles.icon} />
                                }

                                {isLOading ? null : 'Save'}
                            </button>
                        )}

                        {purchase && purchase ? <a
                            className={styles.adownload}
                            href={`https://drive.google.com/uc?export=download&id=${driveId}`}
                            download={driveName}
                        >
                            Download File
                        </a> : <button onClick={() => handleDownload(price)}>
                            <AiOutlineDownload className={styles.icon} /> Buy
                        </button>}


                    </div>
                </div>
            </div>
            <div className={styles.tagsContainer}>
                <h2>Tags</h2>
                <div className={styles.tags}>
                    {tags && tags.map((item, idx) => (
                        <Chip key={idx} label={item} value={item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Info