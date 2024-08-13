import React, { useEffect, useState } from 'react'
import IsLoading from '../Components/IsLoading'
import IsError from '../Components/IsError'
import axios from 'axios'

const Products = () => {
    const URL = "https://fakestoreapi.com/products"
    // const URL = "https://api.escuelajs.co/api/v1/products"


    const [product, setproduct] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [iserror, setError] = useState(false)

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

    console.log(product)

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
                            product && product.map((el,index) => {
                                return <>
                                    <div className='prodcard' key={el.id}>
                                        <img height={'300px'} width={'300px'} src={el.image} alt="" style={{ objectFit: 'contain' }} />
                                        <b>{el.title}</b>
                                        <p>Rs.{el.price}</p>
                                    </div>
                                </>
                            })
                        }

                    </div>
            }
        </div>
    )}

export default Products