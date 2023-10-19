import { useState } from "react"
import styles from "./profile_1.module.css"

import { userData } from "../../data/data"
import { AiOutlineEdit } from "react-icons/ai"
import { Ripple } from "../../components/export"



const Profile_1 = () => {
    const [data, setData] = useState(userData)
    const [toggleinput, settoggleinput] = useState(false)
    const [value, setValue] = useState('')
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }


    return (
        <div className={styles.userInfoContainer} >
            <h2 className={styles.title}>User details</h2>

            <div className={styles.userInfo} >
                {data.map((item, idx) => (
                    <div className={styles.userInfoTable} key={idx} >
                        <div className={styles.textInfo}>
                            <strong className={styles.name} >{item.n}</strong>
                            {editingIndex === idx ?
                                (toggleinput ? <input onChange={handleInputChange} className={styles.input} type="text" value={value} /> : <span className={styles.span}>{item.value}</span>)
                                :
                                <span className={styles.span}>{item.value}</span>}
                        </div>
                        {item.editable &&



                            <>
                                {toggleinput ?
                                    (editingIndex === idx &&
                                        <div className={styles.btnContainer}>
                                            <button className={`${styles.saveBtn} ${styles.btn}`}>Save</button>
                                            <button className={`${styles.cancleBtn} ${styles.btn}`} onClick={() => settoggleinput(!toggleinput)}>Cancle</button>

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
    )
}

export default Profile_1