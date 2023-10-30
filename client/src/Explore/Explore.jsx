import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./explore.module.css"
import { BsSearch } from "react-icons/bs"
import { Card } from "../components/export"
import {
    BiSolidUpArrow,
    BiSolidDownArrow
} from 'react-icons/bi'

const Explore = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/getallItem', {
                params: {
                    page: 1,
                    limit: 5,
                    search,
                    sortBy,
                    category,
                    tag,
                    minPrice,
                    maxPrice,
                },
            });

            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, sortBy, category, tag]);



    return (
        <div className={styles.container}>




            <div className={styles.inputSelectContainer}>

                <div className={styles.inputContainer}>

                    <BsSearch className={styles.icon} />
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.input}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>



                <div className={styles.select}>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>

                    < BiSolidDownArrow className={styles.aicon} />
                </div>


            </div>



            {/* <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                /> */}

<input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input-field"
        />

            <div className={styles.cards}>
                {products.map((item) => (
                    <Card key={item._id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Explore