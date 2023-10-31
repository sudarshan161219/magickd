import { useState } from "react"
import styles from "./profile_1.module.css"

// import { userData } from "../../data/data"
import { AiOutlineEdit } from "react-icons/ai"
import { Ripple } from "../../components/export"
import { useAppContext } from "../../context/Context"




const Profile_1 = () => {
    const { user, toggleUserEditFn, toggleEditUser } = useAppContext()
    // const { name, email, method } = user


    const [namevalue, setNamevalue] = useState(user.name)
    const [emailvalue, setEmailvalue] = useState(user.email)
    const [passwordvalue, setPasswordvalue] = useState()
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleInputChange = (e) => {
        setNamevalue(e.target.value)
    }



    return (
        <div className={styles.userInfoContainer} >
            <h2 className={styles.title}>User details</h2>

            <div className={styles.userInfo} >
                <div className={styles.userInfoTable}  >
                    <div className={styles.textInfo}>
                        <strong className={styles.name} >Name</strong>
                        {
                            toggleEditUser ? <input onChange={handleInputChange} className={styles.input} type="text" value={namevalue} /> : <span className={styles.span}>{user.name}</span>}

                    </div>

                    {/* <>
                        {toggleEditUser ?

                            <div className={styles.btnContainer}>
                                <button className={`${styles.saveBtn} ${styles.btn}`}>Save</button>
                                <button className={`${styles.cancleBtn} ${styles.btn}`} onClick={toggleUserEditFn}>Cancle</button>

                            </div>
                            :
                            <Ripple >
                                <AiOutlineEdit onClick={toggleUserEditFn} className={styles.icon} />
                            </Ripple>
                        }
                    </> */}

                </div>

            </div>


            <div className={styles.userInfo} >
                <div className={styles.userInfoTable}  >
                    <div className={styles.textInfo}>
                        <strong className={styles.name} >User Name</strong>
                        <span className={styles.span}>{user.name}</span>
                    </div>
                </div>
            </div>


            {/* {user.method === "OAuth" ? null : */}
                {/* <div className={styles.userInfo} >
                    <div className={styles.userInfoTable}  >
                        <div className={styles.textInfo}>
                            <strong className={styles.name} >Password</strong>
                            {
                                toggleEditUser ? <input className={styles.input} type="text" value={namevalue} /> : <span className={styles.span}>{user.name}</span>}

                        </div> */}

                        <>
                            {/* {toggleEditUser ?

                                <div className={styles.btnContainer}>
                                    <button className={`${styles.saveBtn} ${styles.btn}`}>Save</button>
                                    <button className={`${styles.cancleBtn} ${styles.btn}`} onClick={toggleUserEditFn}>Cancle</button>

                                </div>
                                :
                                <Ripple >
                                    <AiOutlineEdit onClick={toggleUserEditFn} className={styles.icon} />
                                </Ripple>
                            } */}
                        </>

                    {/* </div>

                </div> */}

            {/* } */}
            {user.email === null ? null :
                <div className={styles.userInfo} >
                    <div className={styles.userInfoTable}  >
                        <div className={styles.textInfo}>
                            <strong className={styles.name} >E-mail</strong>
                            {
                                toggleEditUser ? <input className={styles.input} type="text" value={emailvalue} /> : <span className={styles.span}>{user.email}</span>}

                        </div>

                        {/* <>
                        {toggleEditUser ?

                            <div className={styles.btnContainer}>
                                <button className={`${styles.saveBtn} ${styles.btn}`}>Save</button>
                                <button className={`${styles.cancleBtn} ${styles.btn}`} onClick={toggleUserEditFn}>Cancle</button>

                            </div>
                            :
                            <Ripple >
                                <AiOutlineEdit onClick={toggleUserEditFn} className={styles.icon} />
                            </Ripple>
                        }
                    </> */}

                    </div>

                </div>
 }

        </div >
    )
}

export default Profile_1