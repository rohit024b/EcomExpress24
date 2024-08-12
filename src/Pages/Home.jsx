import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const URL = "https://fakestoreapi.com/products"

const [product, setproduct] = useState([])

    const getData= async()=>{

        let res = await axios.get(URL)
        let data = await res.data
        setproduct(data)
    }

    useEffect(()=>{
        getData()
    },[])

console.log(product)
  return (
    <div>
        {/* intropage 100vh */}
        {/* slider */}
        {/* all the product - Add to cart, Buy */}
        {
            product && product.map((el)=>{
                return <>
                <div key={el.id}>
                    <img height={'100px'} width={'100px'} src={el.image} alt="" style={{objectFit:'contain'}} />
                </div>
                </>
            })
        }

    </div>
  )
}

export default Home