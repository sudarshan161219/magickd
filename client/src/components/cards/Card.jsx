import styles from "./cards.module.css"
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineDownload, AiTwotoneHeart } from "react-icons/ai"
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useAppContext } from "../../context/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsArrowUpRight } from "react-icons/bs"
// eslint-disable-next-line react/prop-types
const Card = ({ item }) => {
    const { user, toggleAuthModalFn, } = useAppContext()
    const [saved, setSaved] = useState(false)
    // const [isSaved, setIssaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleModal = () => {
        toggleAuthModalFn()
    }




    const saveproductFn = async () => {
        setIsLoading(true)
        try {
            // eslint-disable-next-line react/prop-types
            await axios.post(`/api/save/${item._id}`);
            setIsLoading(false)
            setSaved(true)
            toast.success("Item saved.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsLoading(false)
        }
    }

    const unsaveproductFn = async () => {
        setIsLoading(true)
        try {
            // eslint-disable-next-line react/prop-types
            await axios.post(`/api/unsave/${item._id}`);
            setIsLoading(false)
            setSaved(false)
            toast.success("Item removed.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsLoading(false)
        }
    }


    const handleSave = () => {
        if (saved) {
            unsaveproductFn()
        } else {
            saveproductFn()
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (item.savedByUsers.includes(user && user._id)) {
            setSaved(true)
        } else {
            setSaved(false)
        }
    }, [])



    return (
        <div className={styles.card}>

            <div className={styles.top1overlay}>{<h1 className={styles.name}>{item.name}</h1>}</div>
            <Link  to={`/item/${item._id}`} className={styles.overlay}> <BsArrowUpRight  className={styles.icon }/></Link>
            <div className={styles.topoverlay} >

                {user && user.length === 0 ?
                    <IconButton onClick={handleModal} color="primary" aria-label="add to shopping cart">
                        <AiOutlineHeart className={styles.icon} />
                    </IconButton>
                    :


                    (
                        saved ?

                            <IconButton onClick={handleSave} color="primary" aria-label="add to shopping cart">
                                <AiTwotoneHeart className={`${styles.icon} ${styles.heart}`} />
                            </IconButton>
                            :

                            <IconButton onClick={handleSave} color="primary" aria-label="add to shopping cart">
                                <AiOutlineHeart className={styles.icon} />
                            </IconButton>)

                }

                {user && user.length === 0 ?
                    <IconButton onClick={handleModal} color="primary" aria-label="add to shopping cart">
                        <AiOutlineDownload className={styles.icon} />
                    </IconButton>
                    :
                    (
                        // eslint-disable-next-line react/prop-types
                        item.purchase && item.purchase ?
                            <a
                                // eslint-disable-next-line react/prop-types
                                href={`https://drive.google.com/uc?export=download&id=${item.driveId}`}
                                // eslint-disable-next-line react/prop-types
                                download={item.driveName}
                            >
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <AiOutlineDownload className={styles.icon} />
                                </IconButton>
                            </a>

                            :
                            // eslint-disable-next-line react/prop-types
                            <Link to={`/item/${item._id}`} >
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <AiOutlineDownload className={styles.icon} />
                                </IconButton>
                            </Link>)
                }



            </div>
            <img className={styles.img} src={item.imageUrl} alt={item.name} />
        </div >
    )
}

export default Card