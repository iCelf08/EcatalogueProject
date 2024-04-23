import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Your axios instance path may vary
import { makeStyles } from '@material-ui/core/styles';
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

function Category() {
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const classes = useStyles();

  useEffect(() => {
    axios.get('http://localhost:8000/api/category') 
      .then(response => {
        console.log(response.data.results);
        setCategories(response.data.results); // Assuming response.data is an array of categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Check if categories is an array before calling map function
  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>No categories found</p>; // Handle empty state
  }

  return (
    <div>
      <h1>Categories</h1>
      <Container maxWidth="md" component="main">
        <Grid container spacing={4}>
          {categories.map(category => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {category.name}
                  </Typography>
                  <Link href={`/category/${category.id}`} className={classes.link}>
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

export default Category;
