import { useState } from "react"
import styles from "./profile.module.css"
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { userData } from "../data/data"
import { AiOutlineEdit } from "react-icons/ai"
import { Ripple } from "../components/export"

const Profile = () => {
    const [data, setData] = useState(userData)
    const [select, setSelect] = useState(1)
    const [toggleinput, settoggleinput] = useState(false)
    const [value, setValue] = useState('')
    const [editingIndex, setEditingIndex] = useState(-1); // -1 means no element is being edited



    const handleChange = (event) => {
        setSelect(event.target.value);
    };


    // const handleInput = (index) => {
    //     settoggleinput(!toggleinput)
    //     setEditingIndex(index);
    // }

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }


    return (
        <div className={styles.container}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <Select
                        value={select}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={1}>Profile</MenuItem>
                        <MenuItem value={2}>Purchase History</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <div className={styles.userInfoContainer} >
                <h2 className={styles.title}>User details</h2>

                <div className={styles.userInfo} >
                    {data.map((item, idx) => (
                        <div className={styles.userInfoTable} key={idx} >
                            <div className={styles.textInfo}>
                                <strong className={styles.name} >{item.n}</strong>
                                {editingIndex === idx ?
                                 ( toggleinput ?   <input onChange={handleInputChange} type="text" value={value} /> : <span className={styles.span}>{item.value}</span>)
                                    :
                                    <span className={styles.span}>{item.value}</span>}
                            </div>
                            {item.editable &&



                                <>
                                    {toggleinput ?
                                        (editingIndex === idx && <div className={styles.btnContainer}>
                                            <button>save</button>
                                            <button onClick={() => settoggleinput(!toggleinput)}>cancle</button>
                                        </div>
                                        ) :
                                        <Ripple >
                                            <AiOutlineEdit onClick={() => { setEditingIndex(idx); settoggleinput(!toggleinput) }} className={styles.icon} />
                                        </Ripple>
                                    }
                                </>



                            }
                        </div>
                    ))}
                </div>
            </div >
        </div >
    )
}

export default Profile