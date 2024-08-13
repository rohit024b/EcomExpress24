import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import HomeCover from '../Components/HomeCover'
import '../CSS/home.css'
import { AuthContext } from '../Context/AuthContext'
import IsLoading from '../Components/IsLoading'
import IsError from '../Components/IsError'


const Home = () => {
    const URL = "https://fakestoreapi.com/products"

    const [product, setproduct] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [iserror, setError] = useState(false)

    const getData = async () => {

        setLoading(true)                //loading
        await axios.get(URL).then((res) => {
            setLoading(false)                //stop loading
            setError(false)                //no errr
            setproduct(res.data)
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

    console.log(product)
    const filteredProductsM = product.filter((el) => el.category === "men's clothing");
    const filteredProductsW = product.filter((el) => el.category === "women's clothing");
    const filteredProductsJ = product.filter((el) => el.category === "jewelery");

console.log(filteredProductsW)
    const filterdData = [
        {
            name: 'POPULAR IN MEN',
            prod: filteredProductsM
        },
        {
            name: 'POPULAR IN WOMEN',
            prod: filteredProductsW
        },
        {
            name: 'POPULAR JEWELERY',
            prod: filteredProductsJ
        },
    ]

    return (
        <>
            {
                isLoading ? <IsLoading /> :
                    <div className='homeContainer'>
                        <HomeCover />
                        {
                            filterdData.map((el) => {
                                return <>
                                <h1 style={{ marginBottom: "20px" }}>{el.name}</h1>
                                <hr size='5' color='purple' width="200px" />
                                    {
                                        isLoading ? <IsLoading /> : iserror ? <IsError /> :
                                            <div className='homeCards'>
                                                {
                                                    el.prod && el.prod.map((el, index, ) => {
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

                                </>
                            })
                        }
                        

                        {/* <h1 style={{ marginBottom: "20px" }}>POPULAR IN WOMEN</h1>
                        <hr size='5' color='purple' width="200px" />
                        {
                            isLoading ? <IsLoading /> : iserror ? <IsError /> :
                                <div style={{
                                    marginTop: '40px',
                                    marginBottom: '40px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(6, 1fr)',
                                    gap: '10px',
                                    overflowY: 'hidden'
                                }}>
                                    {
                                        filteredProductsW && filteredProductsW.map((el) => {
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
                        } */}

                        {/* <h1 style={{ marginBottom: "20px" }}>POPULAR JEWELERY</h1>
                        <hr size='5' color='purple' width="200px" />
                        {
                            isLoading ? <IsLoading /> : iserror ? <IsError /> :
                                <div style={{
                                    marginTop: '40px',
                                    marginBottom: '40px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '10px',
                                }}>
                                    {
                                        filteredProductsJ && filteredProductsJ.map((el) => {
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
                        } */}
                    </div>
            }
        </>
    )
}

export default Home









{/* intropage 100vh */ }
{/* slider */ }
{/* all the product - Add to cart, Buy */ }



{/* <>
                                <div className='prodcard' key={el.id}>
                                    <img height={'300px'} width={'300px'} src={el.image} alt="" style={{ objectFit: 'contain' }} />
                                </div>
                            </> */}