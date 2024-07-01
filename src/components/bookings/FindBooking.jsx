import React, { useState } from 'react'
import {getBookingByConfirmationCode,cancelBooking} from '../utils/ApiFuncions'
const FindBooking = () => {
    const[confirmationCode,setConfirmationCode]=useState("")
    const[error,setError]=useState("")
    const [successMessage,setSuccesMessage]=useState("")
    const[isLoading,setIsLoading]=useState(false)
    const[bookingInfo,setBookingInfo]=useState({
        bookingId:"", 
        room:{id:"",roomType:""},
        bookingConfirmationId:"",
        email:"",
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        numOfAdults:"",
        numOfChild:"",
        totalNumOfguests:""
    })
    const clearBookingInfo={
        bookingId:"", 
        room:{id:"",roomType:""},
        bookingConfirmationId:"",
        email:"", 
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        numOfAdults:"",
        numOfChild:"",
        totalNumOfguests:""
    }
    const[isDeleted,setIsDeleted]=useState(false)
    const handleInputChange=(e)=>{
        setConfirmationCode(e.target.value)
    }
    const handleFormSubmit=async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        try{
            const data=await getBookingByConfirmationCode(confirmationCode);
            setBookingInfo(data)
            setError("")
        }catch(error){
            setBookingInfo(clearBookingInfo)
            if(error.response && error.response.status === 404){
                setError(error.response.data.message)
            }else{
                setError(error.message)
            }
        }
        setTimeout(()=>
            setIsLoading(false)
        ,2000)

    }
    const handleBookingCancellation=async (bookingId)=>{
        try{
            await cancelBooking(bookingInfo.bookingId)
            setIsDeleted(true)
            setSuccesMessage("Booking has been cancelled")
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
          }catch(error){
            setError(error.message)
          }
          setTimeout(() => {
			setIsDeleted(false)
            setSuccesMessage("")
            
		}, 2000)
    }
  return (
    <>
    <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
        <h2 className='text-center mb-4'>Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className='col-md-6'>
            <div className='input-group mb-3'>
                <input className='form-control' 
                type=""
                 name="bookingConfirmationId" 
                 id="bookingConfirmationId" 
                 value={confirmationCode}
                 onChange={handleInputChange}
                 placeholder='Enter your booking confimation Code'
                 /> 
                 <button className='btn btn-hotel input-group-text'>Find Booking</button>

            </div>

        </form>
        {isLoading?(<div>Finding your Booking.......</div>):
        error ? (<div className='text-danger'>Error : {error}</div>):
        bookingInfo.bookingConfirmationId ? (
            <div className='col-md-6 mt-4 mb-5'> 
            <h3>Booking Information</h3>
            <p>Booking Confirmation Code ::{bookingInfo.bookingConfirmationId}</p>
            <p>Booking ID ::{bookingInfo.bookingId}</p>
            <p>Room Number ::{bookingInfo.room.id}</p>
            <p>Room Type ::{bookingInfo.room.roomType}</p>
            <p>Check-In-Date::{bookingInfo.checkInDate}</p>
            <p>Check-Out-Date::{bookingInfo.checkOutDate}</p>
            <p>Full Name::{bookingInfo.guestFullName}</p>
            <p>Email::{bookingInfo.email}</p>
            <p>Number of Adults::{bookingInfo.numOfAdults}</p>
            <p>Number of Childrens::{ bookingInfo.numOfChild}</p>
            <p>Total Guests::{bookingInfo.totalNumOfguests}</p>
            {!isDeleted &&(
                <button className='btn btn-danger'
                onClick={()=>handleBookingCancellation(bookingInfo.bookingId)}>
                    Cancel Booking
                </button>
            )}
            </div>  
        ):(
            <div>Find booking... </div>
        )}
        {isDeleted&&(
            <div className='alert alert-success mt-3' role='alert'>{successMessage}</div>
        )}

    </div>
      
    </>
  )
}

export default FindBooking
