import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from './axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // Aspect ratio 16:9
    },
    productTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    productText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
    card: {
    },
    cardContent: {
    }
}));

const ProductDetail = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <Container maxWidth="md">
            <Grid container spacing={5} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={product.image || "https://source.unsplash.com/random"}
                            title={product.name}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                className={classes.productTitle}
                            >
                                {product.name}
                            </Typography>
                            <Typography
                                component="p"
                                color="textPrimary"
                                className={classes.productText}
                            >
                                {product.description}
                            </Typography>
                            <Typography
                                component="p"
                                color="textSecondary"
                            >
                                Price: ${product.price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
