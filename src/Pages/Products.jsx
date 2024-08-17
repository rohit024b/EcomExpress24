import React, { useContext, useEffect, useState } from 'react';
import IsLoading from '../Components/IsLoading';
import IsError from '../Components/IsError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Products = () => {
    const URL = "https://fakestoreapi.com/products";
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const { handleCardClick, handleAddToCart } = useContext(AuthContext);

    const [page, setPage] = useState(1);
    const [priceOrder, setPriceOrder] = useState("");
    const [category, setCategory] = useState("");

    const limit = 8;

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(URL);
            setProducts(res.data);
            setFilteredProducts(res.data); // Initially, all products are considered as filtered
            setError(false);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleFilteringAndSorting = () => {
        let updatedProducts = [...products];

        // Filter by category
        if (category) {
            updatedProducts = updatedProducts.filter(
                (product) => product.category === category
            );
        }

        // Sort by price
        if (priceOrder === "asc") {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (priceOrder === "desc") {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        // Update the filtered products
        setFilteredProducts(updatedProducts);

        // Paginate the filtered results
        const startIndex = (page - 1) * limit;
        const paginatedData = updatedProducts.slice(startIndex, startIndex + limit);
        setPaginatedProducts(paginatedData);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handleFilteringAndSorting();
    }, [page, priceOrder, category, products]);

    const handleSortByPrice = (e) => {
        setPriceOrder(e.target.value);
        setPage(1); // Reset to first page after sorting
    };

    const handleSortByCategory = (e) => {
        setCategory(e.target.value);
        setPage(1); // Reset to first page after filtering
    };

    // Calculate total pages dynamically based on filtered data
    const totalPages = Math.ceil(filteredProducts.length / limit);

    return (
        <div className='homeContainer'>
            <h1 style={{ marginBottom: "20px" }}>LATEST COLLECTIONS</h1>
            <hr size='5' color='purple' width="200px" />
            <div>
                {/* Filtering and sorting */}
                <span>
                    <select onChange={handleSortByPrice} name="sortByPrice" id="sortByPrice">
                        <option value="">-Sort by price-</option>
                        <option value="asc">Low To High</option>
                        <option value="desc">High To Low</option>
                    </select>
                    <select onChange={handleSortByCategory} name="sortByCategory" id="sortByCategory">
                        <option value="">-Sort by Category-</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelery</option>
                    </select>
                </span>
            </div>
            {
                isLoading ? <IsLoading /> : isError ? <IsError /> :
                    <div style={{
                        marginTop: '40px',
                        marginBottom: '60px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '10px'
                    }}>
                        {
                            paginatedProducts.map((el) => (
                                <div className='prodcard' key={el.id}>
                                    <img onClick={() => handleCardClick(el.id)} height={'300px'} width={'300px'} src={el.image} alt="" style={{ objectFit: 'contain' }} />
                                    <h4 onClick={() => handleCardClick(el.id)}>{el.title}</h4>
                                    <p onClick={() => handleCardClick(el.id)}>Rs.{el.price}</p>
                                    <button onClick={() => handleAddToCart(el.id)}>Add To Cart</button>
                                </div>
                            ))
                        }
                    </div>
            }
            <div className='pagination'>
                <span>
                    <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>Prev</button>
                    <b>- {page} -</b>
                    <button onClick={() => setPage((prev) => prev + 1)} disabled={page >= totalPages}>Next</button>
                </span>
            </div>
        </div>
    );
};

export default Products;
