import styles from "./blog.module.css"
import { blog } from "../../data/data"
import BlogCard from "../blogCard/BlogCard"

const Blog = () => {

  return (
    <div className={styles.container}>

      <div className={styles.headingContainer}>
        <h1 className={styles.title}>Discover Articles</h1>
      </div>

      <div className={styles.cards}>
        {blog.map((item, idx) => (
          <BlogCard key={idx} item={item} />
        ))}
      </div>

    </div>
  )
}

export default Blog