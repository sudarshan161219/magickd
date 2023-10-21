import { useState } from 'react'
import styles from "./additem.module.css"

const AddItem = () => {

  const [tags, setTags] = useState([])

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Item</h1>

      <div>
        <label htmlFor="inputName">
          Name
          <input type="text" id="inputName" className={styles.input} />
        </label>
      </div>

      <div className={styles.tagsinputcontainer}>
        {
          tags.map((tag, index) => (
            <div key={index} className={styles.tagitem}>
              <span className={styles.text}>{tag}</span>
              <span className={styles.close} onClick={() => removeTag(index)}>&times;</span>
            </div>
          ))
        }

        <input onKeyDown={handleKeyDown} type="text" className={styles.tagsinput} placeholder="Type somthing" />
      </div>
    </div>
  )
}

export default AddItem