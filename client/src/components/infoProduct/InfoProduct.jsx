import { useEffect, useState } from "react";

import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineDownload, AiTwotoneHeart } from "react-icons/ai";
import { Chip } from '@mui/material';
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/Context";
import Recommended from "../recommended/Recommended";
import logo from "../../assets/logo.png"
import styles from "./infoproduct.module.css";
import gif from "../../assets/loading.svg"
import currencyFormatter from 'currency-formatter'
import Card from "../cards/Card"


const InfoProduct = () => {
    const { getSingleProduct, singleProduct, user, isLoading, categoryProducts } = useAppContext();
    const [saved, setSaved] = useState(false);
    const [isLOading, setIsLOading] = useState(false);
    const { id } = useParams();


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

    const { imageUrl, name, description, category, tags, price, driveName, driveId, savedByUsers, purchaseByUser } = singleProduct;


    useEffect(() => {
        getSingleProduct(id)
    }, []);



    setTimeout(() => {
        if (user?._id && savedByUsers && savedByUsers.includes(user._id)) {
            setSaved(true)
        }
    }, 1000);

    const handleDownload = async (price) => {
        try {
            const { data: { key } } = await axios.get("/api/payment/get_key")
            const { data: { order } } = await axios.post('/api/payment/checkout', { price });


            const options = {
                key: key,
                amount: order.amount,
                currency: "INR",
                name: "Magickd",
                description: "Test Transaction",
                image: logo,
                order_id: order.id,
                "callback_url": `http://localhost:5000/api/payment/verification/${id}`,
                prefill: {
                    name: user.name,
                    email: user.email,
                    // contact: "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    color: "#121212"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();


            toast.success("Item successfully .....");
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <img className={styles.gif} src={gif} alt="loading" />
            </div>
        )
    }

    const inr = currencyFormatter.format(price, { code: 'INR' });

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src={imageUrl} alt={name} />
                </div>
                <div className={styles.thriContainer}>
                    <div className={styles.textContainer}>
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>

                    <div >
                        <h3 className={styles.price}>{inr}</h3>
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

                        {user?._id && purchaseByUser && purchaseByUser.includes(user._id) ? <a
                            className={styles.adownload}
                            href={`https://drive.google.com/uc?export=download&id=${driveId}`}
                            download={driveName}
                        >
                            <AiOutlineDownload className={styles.icon} />
                            Download File
                        </a> : <button onClick={() => handleDownload(price)}>
                            Buy
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


            {categoryProducts.length !== 0 &&
                <div className={styles.RecommendedContainer} >
                    {categoryProducts.filter(item => item._id !== id).length === 0 ? null : <h2 className={styles.h2}>Recommended for you</h2>}
                    {/* {categoryProducts.length === 0 ? null : <h2 className={styles.h2}>Recommended for you</h2>} */}
                    <div className={styles.cards}>

                        {categoryProducts
                            .filter(item => item._id !== id)
                            .map((item, idx) => (
                                <Card key={idx} item={item} />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default InfoProduct;
