import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // Aspect ratio 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
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

const Products = ({ products }) => {
    const classes = useStyles();
    if (!products || products.length === 0) return <p >No products for you Yet.. Hit the Register or Sign in bouton</p>;
    return (
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <Link 
                            color="textPrimary"
                            href={'product/' + product.id}
                            className={classes.link}
                            >
                            <CardMedia
                                className={classes.cardMedia}
                                image={product.image || "https://source.unsplash.com/random"}
                                title={product.name}
                            />
                            </Link>
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
                ))}
            </Grid>
        </Container>
    );
};

export default Products;
