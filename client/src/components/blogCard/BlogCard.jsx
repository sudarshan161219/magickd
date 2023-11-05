import { Link } from "react-router-dom"
import moment from "moment";
import styles from "./blogcard.module.css"
import { AiOutlineDelete } from "react-icons/ai"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from "react-hot-toast";
// eslint-disable-next-line react/prop-types
const BlogCard = ({ item }) => {


    // eslint-disable-next-line react/prop-types
    const { _id, name, description, coverImg, authorName, content, tags, category, createdAt } = item
    const date = moment(createdAt);
    let Fdate = date.startOf("hour").fromNow();
    return (
        <Card className={styles.card}>
            <CardMedia
                sx={{ height: 140 }}
                image={coverImg}
                title={name}
            />
            <CardContent sx={{ backgroundColor: 'var(--bg)' }}>
                <h1 className={styles.h1}>{name}</h1>
                {/* <p className={styles.p}>  {description}</p> */}
            </CardContent>
            <div className={styles.spans}>
                <span className={styles.span}>
                    {authorName}
                </span>
                <span className={styles.span}>
                    {Fdate}
                </span>
            </div>
            <CardActions sx={{ backgroundColor: 'var(--bg)' }} className={styles.actions}>
                <Link to={`/post/${item._id}`}><Button size="small">Read More</Button></Link>
            </CardActions>
        </Card>
    )
}

export default BlogCard