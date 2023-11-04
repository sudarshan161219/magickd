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
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useLocation } from 'react-router-dom';
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
    const [value, setValue] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('category');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (e) => {
        setCategory(e.target.innerText)

    }

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('/api/getallItem', {
                params: {
                    page: 1,
                    limit: 5,
                    search: searchQuery ? searchQuery : null,
                    sortBy,
                    category: category ? category.toLowerCase() : null,
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
    }, [search, sortBy, category, tag, searchQuery]);


    return (
        <div className={styles.container}>
            {/* <div className={styles.inputSelectContainer}>

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

            </div> */}


            <div className={styles.headingContainer}>
                <h1>{searchQuery ? searchQuery : 'Explore'}</h1>
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


            {isLoading ?
                <div className={styles.container}>
                    <div className={styles.cards}>
                        <Loading />
                    </div>
                </div>
                :
                <>
                    <Box className={styles.tabs} sx={{ bgcolor: 'background.paper' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            aria-label="scrollable force tabs example"
                        >
                            {/* {products.map((item) => (
                                <Tab onClick={handleClick} key={item._id} label={item.category} />
                            ))} */}


                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />
                            <Tab  label='category' />


                        </Tabs>
                    </Box>

                    <div className={styles.cards}>
                        {products.map((item) => (
                            <Card key={item._id} item={item} />
                        ))}
                    </div>
                </>


            }


        </div>
    )
}

export default Explore