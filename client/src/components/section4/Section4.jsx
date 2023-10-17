import styles from "./section4.module.css"
import { useState, useEffect } from "react"
import { testimonials } from "../../data/data"
import {
    BiSolidQuoteAltLeft,
    BiSolidQuoteAltRight
}
    from "react-icons/bi"
import { GrNext, GrPrevious } from "react-icons/gr"
const Section4 = () => {
  const [data, setData] = useState(testimonials)
  const [index, setIndex] = useState(0)

  useEffect(() => {
      const lastIdx = data.length - 1;

      if (index < 0) {
          setIndex(lastIdx)
      }

      if (index > lastIdx) {
          setIndex(0)
      }


  }, [index, data])



  useEffect(() => {
      const slider = setInterval(() => {
          setIndex(index + 1)
      }, 4000)
      return () => clearInterval(slider)
  }, [index, data])

  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>What people say?</h1>
        <div className={styles.cards}>
            {data.map((item, idx) => {
                const { name, shopName, text } = item
                let position = "nextSlide";

                if (idx === index) {
                    position = "activeSlide";
                }

                if (idx === index - 1 || (index === 0 && idx === data.length - 1)) {
                    position = "lastSlide";
                }

                return (
                    <div key={idx} className={`card ${position}`} >
                        <p className={text}> <BiSolidQuoteAltLeft className={styles.icon} /> {text} <BiSolidQuoteAltRight className={styles.icon} /></p>
                        <div className={styles.spanContainer} >
                            <span className={styles.name}>-{name}</span>
                            <span className={styles.shopName}>{shopName}</span>
                        </div>
                    </div>
                )

            }
            )}
            <div className={styles.btnContainer}>
                <button onClick={() => setIndex(index - 1)} className={styles.btn}><GrPrevious className={styles.icons} /></button>
                <button onClick={() => setIndex(index + 1)} className={styles.btn}><GrNext className={styles.icons} /></button>
            </div>
        </div>
    </div>
)
}

export default Section4