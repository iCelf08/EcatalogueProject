import React, { useEffect, useState } from 'react';
import axios from './axios'; 
import Products from './components/Products'; 
import ProductLoadingComponent from './ProductLoading';
import Categories from './components/category';
import { Link } from 'react-router-dom';

function App() {
    const ProductLoading = ProductLoadingComponent(Products);
    const [appState, setAppState] = useState({
        loading: true,
        products: [],
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/') // Ensure this is the correct endpoint
            .then((res) => {
                setAppState({ loading: false, products: res.data.results });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setAppState({ loading: false, products: [] });
            });
    }, []);

    return (
            
         <div className="App">
            < Categories /> {/* Render your Categories component */}
            <h1>Products</h1> 
        <ProductLoading isLoading={appState.loading} products={appState.products} />
        </div>
    );
}

export default App;
