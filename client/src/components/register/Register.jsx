import { useState } from 'react'
import styles from "./register.module.css"
import { FcGoogle } from "react-icons/fc"
import { BsFacebook } from "react-icons/bs"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCloseCircle } from "react-icons/ai"
import { useAppContext } from "../../context/Context"
import loading from "../../assets/loading.svg"
import { Ripple } from '../export'
import logo from "../../assets/logo.png"

const Register = () => {
    const { loginFn, registerFn, toggleAuthModal, toggleAuthModalFn,  isRLLoading } = useAppContext()
    const [show, setShow] = useState(false)
    const [isMember, setIsMember] = useState(false)



    const handleShowPassword = () => {
        setShow(!show)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        if (isMember) {
            loginFn(data);
        } else {
            registerFn(data);
        }

        e.currentTarget.reset();

    };


    const handleIsMember = () => {
        setIsMember(!isMember)
    }

    const handleGoogle = () => {
        window.open("http://localhost:5000/api/user/auth/google/callback", "_self")
    }

    const handleFacebook = () => {
        window.open("http://localhost:5000/api/user/auth/oauth2/redirect/facebook", "_self")
    }


    return (
        <div className={`${toggleAuthModal ? `${styles.show} ${styles.main}` : `${styles.main}`}`}>

            <div className={styles.container}>
                {isRLLoading ?
                    <div className={styles.loading}>
                        <img src={loading} alt="loading..." />
                    </div> :

                    <div className={styles.formContainer} >
                        <div className={styles.iconContainer}>
                            <img src={logo} className={styles.logo} alt="magickd" />
                            <Ripple ><AiOutlineCloseCircle onClick={toggleAuthModalFn} className={styles.icon} /></Ripple> </div>
                        <h1 className={styles.title}> {isMember ? "Welcome Back!" : "Create Account"}</h1>
                        <div className={styles.authGoogle_faceBook} >
                            <button onClick={handleGoogle} className={`${styles.btn} ${styles.socialBtn}`}>
                                <FcGoogle className={styles.socialIcon} />
                                {`Continue with Google`}

                            </button>
                            {/* <button onClick={handleFacebook} className={`${styles.btn} ${styles.socialBtn}`}>
                                <BsFacebook className={`${styles.socialIcon}  ${styles.socialFacebookIcon}`} />
                                {`Continue with Facebook`}
                            </button> */}
                        </div>


                        <span className={styles.span}>- OR - </span>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {isMember ? null : <div className={styles.group}>
                                <input name='name' className={styles.input} type="text" required />
                                <span className={styles.bar}></span>
                                <label className={styles.label}>Name</label>
                            </div>}
                            <div className={styles.group}>
                                <input name='email' className={styles.input} type="text" required />
                                <span className={styles.bar}></span>
                                <label className={styles.label}>Email Address</label>
                            </div>
                            <div className={`${styles.group} ${styles.passwordContainer}`}>
                                <input name='password' className={styles.input} type={show ? "text" : "password"} required />
                                <span className={styles.bar}></span>
                                <label className={styles.label}>Password</label>

                                {show ? <AiOutlineEyeInvisible onClick={handleShowPassword} className={styles.pIcon} /> :
                                    <AiOutlineEye onClick={handleShowPassword} className={styles.pIcon} />
                                }
                            </div>
                            <button className={`${styles.btn} ${styles.button}`}>{isMember ? "Login" : "Create Account"}</button>
                        </form>
                        <p className={styles.desc}>
                            {`${isMember ? "Don't" : "Already"} have a account?`} <span
                                onClick={handleIsMember} className={styles.descSpan}> {isMember ? "Sign Up" : "Log In"}  </span> </p>
                    </div>

                }

            </div>
        </div>

    )
}

export default Register