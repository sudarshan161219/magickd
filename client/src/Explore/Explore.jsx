import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./explore.module.css"
import { Card } from "../components/export"
import Loading from "../components/skeletonLoading/Loading"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Pagination from '@mui/material/Pagination';
import currencyFormatter from 'currency-formatter';
import usePagination from '@mui/material/usePagination';
import { useLocation } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';


const sxS = {
    backgroundColor: 'var(--softBg)',
    color: ['var(--softTextColor)']
}

const Explore = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    // const [minPrice, setMinPrice] = useState('');
    // const [maxPrice, setMaxPrice] = useState('');
    const [price, setPrice] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('query');
    const [numOfPages, setNumOfPages] = useState('')
    const [page, setPage] = useState(1);
    const [pC, setpC] = useState([])


    const handleChange = (event, newValue) => {
        setValue(newValue);
        let text = event.target.innerText
        let presult = text.slice(1);

        const valueWithComma = presult;
        const valueWithoutComma = parseInt(valueWithComma.replace(/,/g, ''), 10);
        const num = Number(valueWithoutComma)
        setPrice(num)
    };

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
        let text = event.target.innerText;
        let cresult = text.toLowerCase();
        setCategory(cresult)
    };

    const fetchPc = async () => {
        try {
            const response = await axios.get('/api/category_price');
            setpC(response.data.products)
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
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
                    category: category ? category : null,
                    tag: searchQuery ? searchQuery : null,
                    price: price ? price : null,
                },
            });
            setIsLoading(false)
            setProducts(response.data.products);
            setNumOfPages(response.data.numofPages)
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };

    const handlepChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        fetchPc()
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [search, sortBy, category, tag, searchQuery, price]);


    const uniqueCategories = {}; // Use an object as a lookup for unique categories
    const uniqueCategoryItems = pC.filter((item) => {
        if (!uniqueCategories[item.category]) {
            uniqueCategories[item.category] = true;
            return true;
        }
        return false;
    });


    return (
        <div className={styles.container}>
            <div className={styles.headingContainer}>
                <h1>{searchQuery ? searchQuery : 'Explore'}</h1>


                <div className={styles.formContainer}>

                    <FormControl sx={sxS} size="small">
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={sxS}
                        >
                            <MenuItem  value={'latest'}>Latest</MenuItem>
                            <MenuItem  value={'oldest'}>Oldest</MenuItem>
                        </Select>
                    </FormControl>

                </div>

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
                            sx={sxS}
                        >
                            <Tab  sx={sxS} label='All' />
                            {uniqueCategoryItems.map((item) => {
                                const inr = currencyFormatter.format(item.price, { code: 'INR' });
                                return (
                                    <Tab  sx={sxS} key={item._id} label={inr} />
                                )
                            })}
                        </Tabs>
                    </Box>


                    <Box className={styles.tabs} sx={{ bgcolor: 'background.paper' }}>
                        <Tabs
                            value={value1}
                            onChange={handleChange1}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            aria-label="scrollable force tabs example"
                            sx={sxS}
                        >
                            <Tab  sx={sxS} label='All' />
                            {uniqueCategoryItems.map((item) => (
                                <Tab  sx={sxS} key={item._id} label={item.category} />

                            ))}
                        </Tabs>
                    </Box>
                    <div>

                    </div>
                    <div className={styles.cards}>
                        {products.map((item) => (
                            <Card key={item._id} item={item} />
                        ))}
                    </div>
                </>
            }
            {numOfPages > 1 &&
                <div className={styles.page}>
                    <Pagination sx={{ color: 'var(--textColor)', backgroundColor: 'var(--bg)' }} size="large" page={page} count={Number(numOfPages)} onChange={handlepChange} />
                </div>
            }
        </div>
    )
}

export default Explore