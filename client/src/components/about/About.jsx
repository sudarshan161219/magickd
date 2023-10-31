import styles from "./about.module.css"
import img from "../../assets/img.jpg"
import { BiLogoLinkedin, BiLogoFacebook, BiLogoInstagram } from "react-icons/bi"
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai"

const About = () => {
    return (
        <div className={styles.container} >
            <div className={styles.titleContainer} >
                <h1 className={styles.title}>About Us</h1>
            </div>

            <div className={styles.textimgContainer}>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?auto=format&fit=crop&q=80&w=1458&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className={styles.textContainer}>
                    <h2>
                        Passionately Pursuing Digital Filmmaking: Crafting Short Films and Forging Ahead
                    </h2>

                    <p>In the realm of digital filmmaking, our fervor knows no bounds. With a series of short films under our belt, we remain committed to our cinematic journey, dedicated to producing more compelling creations in the days to come.</p>
                </div>

            </div>

            <div className={styles.textimgContainer2}>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src="https://images.unsplash.com/photo-1632059368252-be6d65abc4e2?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className={styles.textContainer}>
                    <h2>
                        Elevating Your Brand with Magickd: Unveiling Creative Graphic Design Services
                    </h2>

                    <p>In the vibrant world of multimedia, Magickd emerged in 2019 as a dynamic company. We specialize in Graphic Design Services, offering a wide array of creative solutions. Whether it's crafting a distinctive logo, designing captivating posters and flyers, creating eye-catching banners, developing enticing menus, or fashioning unique business cards – at Magickd, we bring your vision to life.</p>
                </div>

            </div>


            <div className={styles.titleContainer2} >
                <h1 className={styles.title}>Our Founder</h1>
            </div>

            <div className={styles.textimgContainer3}>
                <div className={styles.iimgContainer}>
                    <img className={styles.iimg} src={img} alt="Our Founder" />
                </div>


                <div className={styles.ttextContainer}>
                    <h2>The Creative Force</h2>

                    <p>At the helm of our enterprise is <span className={styles.span}>Anivesh Soni</span> , a multi-talented individual whose journey is as inspiring as his work. With a background in filmmaking and entrepreneurship, he possesses an extensive understanding of the entire filmmaking process, from Pre-Production to Production and Post-Production. Anivesh is not just a filmmaker; he is also a member of SWA India, showcasing his commitment to the art of storytelling.</p>
                </div>

                <div className={styles.socialsContainer} >
                    <ul className={styles.ul}>

                        <li className={styles.li}>
                            <a href="https://in.linkedin.com/in/anivesh-soni-93200743" target="_blank" rel="noreferrer">
                                <BiLogoLinkedin className={styles.socialIcons} />
                            </a>
                        </li>
                        <li className={styles.li}>
                            <a href="https://www.facebook.com/AniveshSoni" target="_blank" rel="noreferrer">
                                <BiLogoFacebook className={styles.socialIcons} />
                            </a>
                        </li>
                        <li className={styles.li}>
                            <a href="https://twitter.com/Magickdcompany" target="_blank" rel="noreferrer">
                                <AiOutlineTwitter className={styles.socialIcons} />
                            </a>
                        </li>
                        <li className={styles.li}>
                            <a href="https://www.instagram.com/aniveshsoni" target="_blank" rel="noreferrer">
                                <BiLogoInstagram className={styles.socialIcons} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>



        </div>
    )
}

export default About