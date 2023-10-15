import styles from './main.module.css'
import { Intro, MainMenu, Testimonials } from "../components/export"
const Main = () => {
    return (
        <div className={styles.container}  >
            {/* < Intro /> */}
            <MainMenu />
            <Testimonials />
        </div>
    )
}

export default Main