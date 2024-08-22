import React, { useContext, useEffect, useState } from 'react'
import '../CSS/home.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import IsLoading from '../Components/IsLoading'
import IsError from '../Components/IsError'


const ProdDetails = () => {
  const URL = "https://fakestoreapi.com/products"
  const [details, setDetail] = useState([{}])
  const [isLoading, setLoading] = useState(false)
  const [iserror, setError] = useState(false)

  const { handleAddToCart } = useContext(AuthContext)
  const { id } = useParams()

  const getData = async () => {
    setLoading(true)
    await axios
      .get(`${URL}/${id}`).then((res) => {
        setLoading(false)                //stop loading
        setError(false)                //no errr
        setDetail(res.data)
      }).catch((err) => {
        console.log(err)
        setLoading(false)                //stop loading
        setError(true)                //errr
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='homeContainer'>
      {
        isLoading ? <IsLoading /> : iserror ? <IsError /> :
          <div style={{
            width: '100%',
            height: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img height={'500px'} width={'500px'} style={{
              objectFit: 'contain'
            }} src={details.image} alt="" />
            <div style={{
              margin: '100px',
              width: '450px',
              textAlign: 'left',
            }}>
              <h2>{details.title}</h2>
              <p>{details.description}</p>
              <span gap='10px'>
                <b>{details.rating?.rate}⭐</b>
                <b>  </b>
                <b>{details.rating?.count}💖</b>
              </span>
              <h3>Price - Rs.{details.price}</h3>
              <button className='asd' style={{ height: '50px', width: '100%', fontSize: '18px' }} onClick={() => handleAddToCart(id)} >Add To Cart</button>
            </div>
          </div>}
    </div>
  )
}

export default ProdDetails