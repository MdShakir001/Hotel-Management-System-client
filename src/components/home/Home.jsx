import React, { useEffect } from 'react'
import HeaderMain from '../layout/HeaderMain'
import HotelServices from '../common/HotelServices'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location=useLocation()
  let message=location.state && location.state.message
  let currentUser=localStorage.getItem("userId")
  useEffect(()=>{
    setTimeout(()=>{
      message=""
      currentUser=""
    },5000)
  },[])
  

  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && (
        <h6>You are logged in as {currentUser}</h6>
      )}
      <HeaderMain/>
      <section className='container'>
        <Parallax/>
        <RoomSearch/>
        <RoomCarousel/>
        <HotelServices/>
        <Parallax/>
        <RoomCarousel/>

      </section>
    </section>
  )
}

export default Home
