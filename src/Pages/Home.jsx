import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import HomeCover from '../Components/HomeCover'
import '../CSS/home.css'
import IsLoading from '../Components/IsLoading'
import IsError from '../Components/IsError'
import AuthContext from '../Context/AuthContext'



const Home = () => {
    const URL = "https://fakestoreapi.com/products"

    const [product, setproduct] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [iserror, setError] = useState(false)

    const { handleCardClick } = useContext(AuthContext)

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

    // console.log(product)

    useEffect(() => {
        getData();
    }, [])


    // console.log(product)
    const filteredProductsM = product.filter((el) => el.category === "men's clothing");
    const filteredProductsW = product.filter((el) => el.category === "women's clothing");
    const filteredProductsJ = product.filter((el) => el.category === "jewelery");
    const filteredProductsE = product.filter((el) => el.category === "electronics");

    // console.log(filteredProductsW)
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
        {
            name: 'POPULAR IN ELECTRONICS',
            prod: filteredProductsE
        },
    ]

    return (
        <>
            {
                isLoading ? <IsLoading /> : iserror ? <IsError /> :
                    <div className='homeContainer'>
                        <HomeCover />
                        {
                            filterdData.map((el) => {
                                return <>
                                    <h1 style={{ marginBottom: "20px" }}>{el.name}</h1>
                                    <hr size='5' color='purple' width="200px" />
                                    {
                                        isLoading ? <IsLoading /> : iserror ? <IsError /> :
                                            <div className={el.name === 'POPULAR IN WOMEN' || el.name === 'POPULAR IN ELECTRONICS' ? 'homeCardsW' : 'homeCards'}>
                                                {
                                                    el.prod && el.prod.map((elm, index,) => {
                                                        return <>
                                                            <div onClick={() => handleCardClick(elm.id)} className='prodcard' key={elm.id}>
                                                                <img height={'300px'} width={'300px'} src={elm.image} alt={elm.title} style={{ objectFit: 'contain' }} />
                                                                <b>{elm.title}</b>
                                                                <p>Rs.{elm.price}</p>
                                                            </div>
                                                        </>
                                                    })
                                                }
                                            </div>
                                    }
                                </>
                            })
                        }
                    </div>
            }
        </>
    )
}

export default Home