import React, { useEffect, useState } from 'react'
import  {getAllBookings, cancelBooking } from '../utils/ApiFuncions'
import Header from '../common/Header'
import BookingTable from './BookingTable'
const Bookings = () => {
  const[bookingInfo,setBookingInfo]=useState([])
  const[isLoading,setIsLoading]=useState(true)
  const[error,setError]=useState("")
  useEffect(()=>{
    setTimeout(()=>{
      getAllBookings().then((data)=>{
        setBookingInfo(data)
        setIsLoading(false)
        
      }).catch((error)=>{
        setError(error.message)
        setIsLoading(false)
      })
    },1000)
  },[])
  const handleBookingCancellation= async (bookingId)=>{
    try{
      await cancelBooking(bookingId)
      const data=await getAllBookings()
      setBookingInfo(data)
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <section className='container' style={{backgroundColor:"whitesmoke"}}>
      <Header title={'Existing Booking'}/>
      {error && <p className='text-danger'>{error}</p>}
      {isLoading?(<div>Loading Existing Bookings</div>):
      <BookingTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
      }
    </section>
  )
}

export default Bookings
