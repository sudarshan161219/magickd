import { useState, useEffect } from "react"
import styles from "./profile.module.css"
import Box from '@mui/material/Box';
import {
    Profile_1,
    Profile_2,
} from "../components/export"

import { Downloads, Saved } from "./export";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAppContext } from "../context/Context"


const Profile = () => {
    const { getPurchasedProductFn, getSavedProductFn, savedItems, purchasedItems, isLoading } = useAppContext()

    const [toggle, setToggle] = useState(false)
    const [select, setSelect] = useState(1)
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTab1 = () => {
        getPurchasedProductFn()
    }

    const handleTab2 = () => {
        getSavedProductFn()
    }


    return (
        <Box sx={{ width: '100%', typography: 'body1', padding: '10px' }} >
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' ,}}>
                    <TabList centered onChange={handleChange} aria-label="lab API tabs example">
                        <Tab  label="User details" value="1" />
                        <Tab onClick={handleTab1} label="Downloads" value="2" />
                        <Tab onClick={handleTab2} label="Saved" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1"><Profile_1 /></TabPanel>
                <TabPanel value="2" >  <Downloads /></TabPanel>
                <TabPanel value="3" ><Saved /></TabPanel>
            </TabContext>
        </Box>
    );
}

export default Profile