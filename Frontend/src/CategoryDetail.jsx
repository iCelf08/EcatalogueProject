import React, { useState, useEffect } from 'react';
import axios from './axios'; // Your axios instance path may vary
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Container, Link, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function CategoryDetail() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const classes = useStyles();
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
      axios.get(`http://localhost:8000/api/category/${id}`) // Corrected endpoint URL
          .then(response => {
  
              setCategoryProducts(response.data.products); // Assuming response.data.results is an array of categories
          })
          .catch(error => {
              console.error('Error fetching categories:', error);
          });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <Container maxWidth="md" component="main">
        <Grid container spacing={4}>
          {categoryProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Link href={`/product/${product.id}`} className={classes.link}>
                    View Products
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default CategoryDetail;
