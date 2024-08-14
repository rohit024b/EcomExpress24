import React, { useContext, useEffect, useState } from 'react'
import IsLoading from '../Components/IsLoading'
import IsError from '../Components/IsError'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'

const Products = () => {
    const URL = "https://fakestoreapi.com/products"
    // const URL = "https://api.escuelajs.co/api/v1/products"
    const navigate = useNavigate();

    const [product, setproduct] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [iserror, setError] = useState(false)
    const { handleCardClick, handleAddToCart } = useContext(AuthContext)


    const getData = async () => {

        setLoading(true)                //loading
        await axios.get(URL).then((res) => {
            setError(false)                //no errr
            setproduct(res.data)
            setLoading(false)                //stop loading
        }).catch((err) => {
            console.log(err)
            setLoading(false)                //stop loading
            setError(true)                //errr
        })

    }

    // console.log(product)

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='homeContainer'>
            <h1 style={{ marginBottom: "20px" }}>LATEST COLLECTIONS</h1>
            <hr size='5' color='purple' width="200px" />
            {
                isLoading ? <IsLoading /> : iserror ? <IsError /> :
                    <div style={{
                        marginTop: '40px',
                        marginBottom: '60px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '10px'
                    }}>
                        {
                            product && product.map((el, index) => {
                                return <>
                                    <div className='prodcard' key={el.id}>
                                        <img onClick={() => handleCardClick(el.id)} height={'300px'} width={'300px'} src={el.image} alt="" style={{ objectFit: 'contain' }} />
                                        <h4 onClick={() => handleCardClick(el.id)}>{el.title}</h4>
                                        <p onClick={() => handleCardClick(el.id)}>Rs.{el.price}</p>
                                        <button onClick={() => handleAddToCart(el.id)}>Add To Cart</button>
                                    </div>
                                </>
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Products