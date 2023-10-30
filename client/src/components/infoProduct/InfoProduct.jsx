import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlineDownload, AiTwotoneHeart } from "react-icons/ai";
import { Chip } from '@mui/material';
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/Context";
import Recommended from "../recommended/Recommended";
import logo from "../../assets/logo.png"
import styles from "./infoproduct.module.css";

const InfoProduct = () => {
    const { getSingleProduct, isLoading, singleProduct, user } = useAppContext();
    const [saved, setSaved] = useState(false);
    const [Price, setPrice] = useState(singleProduct.price)
    const [isLOading, setIsLOading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getSingleProduct(id);

        if (singleProduct.savedByUsers && singleProduct.savedByUsers.includes(user && user._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, []);

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
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
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
        return <h1>Loading.......</h1>;
    }

    const { imageUrl, name, description, category, tags, price } = singleProduct;

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
                    <div className={styles.categoryContainer}>
                        <Chip label={category} variant="outlined" />
                    </div>
                    <div className={styles.btnContainer}>
                        {saved ? (
                            <button onClick={handleSave}>
                                <AiTwotoneHeart className={`${styles.icon} ${styles.heart}`} />Save
                            </button>
                        ) : (
                            <button onClick={handleSave}>
                                <AiOutlineHeart className={styles.icon} />Save
                            </button>
                        )}
                        <button onClick={() => handleDownload(price)}>
                            <AiOutlineDownload className={styles.icon} /> Download
                        </button>
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
            <div>
                <h2>Recommended for you (category)</h2>
                <Recommended />
            </div>
        </div>
    );
};

export default InfoProduct;
