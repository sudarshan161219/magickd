import { Link } from "react-router-dom"
import styles from "./blogcard.module.css"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
const BlogCard = ({ item }) => {

    const { name, date, author, content, image } = item

    return (
        <Card className={styles.card}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/blog/${item._id}`}><Button size="small">Read More</Button></Link>
            </CardActions>
        </Card>
    )
}

export default BlogCard