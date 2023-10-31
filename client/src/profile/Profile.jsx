import { useState } from "react"
import styles from "./profile.module.css"
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
    Profile_1,
    Profile_2,
} from "../components/export"


const Profile = () => {
    const [toggle, setToggle] = useState(false)
    const [select, setSelect] = useState(1)
    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    return (
        <div className={styles.container}>
            {/* <Box className={styles.box} sx={{ minWidth: 120 }} >
                <FormControl fullWidth>
                    <Select
                        value={select}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem onClick={() => setToggle(!toggle)} value={1}>Profile</MenuItem>
                        <MenuItem onClick={() => setToggle(!toggle)} value={2}>Purchase History</MenuItem>
                    </Select>
                </FormControl>
            </Box> */}

{/* 
            <div className={styles.contentContainer}>{toggle ? <Profile_2 /> : <Profile_1 />} </div> */}

            <div className={styles.contentContainer}><Profile_1 /> </div>

        </div >
    )
}

export default Profile