import styles from './main.module.css'
import { Section1, Section2, Section3, Section4} from "../components/export"
const Main = () => {
    return (
        <div className={styles.container}  >
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
        </div>
    )
}

export default Main