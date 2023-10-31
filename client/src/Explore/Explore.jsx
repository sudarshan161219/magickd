import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./explore.module.css"
import { BsSearch } from "react-icons/bs"
import { Card } from "../components/export"
import Loading from "../components/skeletonLoading/Loading"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import {
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
    const [isLoading, setIsLoading] = useState(false)

    const fetchProducts = async () => {
        setIsLoading(true)
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
            setIsLoading(false)
            setProducts(response.data.products);
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, sortBy, category, tag]);

    return (
        <div className={styles.container}>
            <div className={styles.inputSelectContainer}>

                <TextField
                    fullWidth
                    label="Search"
                    id="outlined-size-small"
                    defaultValue={search}
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <FormControl sx={{ minWidth: 120 }} size="small">
                    <Select
                         value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={'latest'}>Latest</MenuItem>
                        <MenuItem value={'oldest'}>Oldest</MenuItem>
                    </Select>
                </FormControl>

            </div>





            {/* </div> */}


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

            {/* <input
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
            /> */}


            {isLoading ?

                <div className={styles.container}>
                    <div className={styles.cards}>
                        <Loading />
                    </div>
                </div>

                :
                <div className={styles.cards}>
                    {products.map((item) => (
                        <Link key={item._id} to={`/item/${item._id}`}><Card item={item} /></Link>
                    ))}
                </div>
            }


        </div>
    )
}

export default Explore