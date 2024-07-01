import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFuncions'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import  {Form , FormControl } from 'react-bootstrap'
import BookingSummary from './BookingSummary'

const BookingForm = () => {
    const [isValidated,setIsValidated]=useState(false)
    const [isSubmited,setIsSubmitted]=useState(false)
    const[errorMessage,setErrorMessage]=useState("")
    const[roomPrice,setRoomPrice]=useState(0)
    const {roomId}=useParams()
    const currentUser=localStorage.getItem("userId")
    const[booking,setBooking]=useState({
        guestFullName:"",
        email:currentUser,
        checkInDate:"",
        checkOutDate:"",
        numOfAdults:"",
        numOfChild:""

    })
    const [roomInfo,setRoomInfo]=useState({
        photo:"",
        roomType:"",
        price:""
    })
    const navigate=useNavigate()
    const today = new Date().toISOString().slice(0, 10);
    const getRoomPriceById=async (roomId)=>{
        try{
            const response=await getRoomById(roomId)
            setRoomPrice(response.price)

        }catch(error){
            throw new Error(error)
        }
    }
    const handleInputChange=(e)=>{
        const{name,value}=e.target
        setBooking({...booking,[name]:value})
        setErrorMessage("")
    }
    useEffect(()=>{
        getRoomPriceById(roomId)
    },[roomId])
    const calculatePayment=()=>{
        const checkInDate=moment(booking.checkInDate)
        const checkOutDate=moment(booking.checkOutDate) 
        const diffInDays=checkOutDate.diff(checkInDate,"days")
        
        const paymentPerDay=roomPrice ? roomPrice:0
        return diffInDays===0?paymentPerDay:diffInDays*paymentPerDay
    }
    const isGuestValid=()=>{
        return parseInt(booking.numOfAdults)>=1
    }
    const isDateValid=()=>{
        if(booking.checkInDate<today ){
            setErrorMessage("Enter a valid check in date")
            return false
        } 
        else if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Enter a valid check out date")
            return false
        }else{
            setErrorMessage("")
            return true;
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const form =e.currentTarget
        if(form.checkValidity() === false || !isGuestValid()|| !isDateValid()){
            e.stopPropagation()
        }else{
            setIsSubmitted(true)

        }
        setIsValidated(true)
    }
    const handleBooking=async ()=>{
        try{
            const confirmationCode=await bookRoom(roomId,booking)
            setIsSubmitted(true)
            navigate("/bookingSuccess",{state:{message:confirmationCode}})
        }catch(error){
            setErrorMessage(error.message)
            console.log(error.message)
            navigate("/bookingSuccess",{state:{error:error.message}})

        }
    }
  return (
    <>
    <div className='container mb-5'>
        <div className='row'>
            <div className='col-md-6'>
                <div className='card card-body mt-5'>
                    <h4 className='card card-title'>Reserve Room</h4>
                    <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='guestName'>Full Name</Form.Label>
                            <FormControl
                        required
                        type='text'
                        id='guestFullName'
                        name='guestFullName'
                        value={booking.guestFullName}
                        placeholder='Enter your Full Name'
                        onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please Enter your Full Name
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <FormControl
                        required
                        type='email'
                        id='email'
                        name='email'
                        value={booking.email}
                        placeholder='Enter your email'
                        onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please Enter your email
                        </Form.Control.Feedback>
                        </Form.Group>


                        <fieldset style={{border:'2px'}}>
                            <legend>Lodging period</legend>
                            <div className='row'>
                                <div className='col-6'>
                                
                            <Form.Label htmlFor='checkInDate'>Check In Date</Form.Label>
                            <FormControl
                        required
                        type='date'
                        id='checkInDate'
                        name='checkInDate'
                        value={booking.checkInDate}
                        placeholder='Enter check-In-Date'
                        min={moment().format("MMM Do, YYYY")}
                        onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please Enter Check In Date
                        </Form.Control.Feedback>
                        

                                </div>
                                <div className='col-6'>
                                
                            <Form.Label htmlFor='checkOutDate'>Check Out Date</Form.Label>
                            <FormControl
                        required
                        type='date'
                        id='checkOutDate'
                        name='checkOutDate'
                        value={booking.checkOutDate}
                        placeholder='Enter check-Out-Date'
                        min={moment().format("MMM Do, YYYY")}
                        onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please Enter Check Out Date
                        </Form.Control.Feedback>
                                </div>
                                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                            </div>
                            </fieldset>


                            <fieldset>
                                <legend>Number of Guests</legend>
                                <div className='row'>
                                    <div className='col-6'>
                                    <Form.Label htmlFor='numOfAdults'>Adults: </Form.Label>
                            <FormControl
                        required
                        type='number'
                        id='numOfAdults'
                        name='numOfAdults'
                        value={booking.numOfAdults}
                        placeholder='1'
                        min={1}
                        onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please Enter number of Adults
                        </Form.Control.Feedback>

                                    </div>
                                    <div className='col-6'>
                    <Form.Label htmlFor='numbOfChildrens'>Childrens: </Form.Label>
                    <FormControl
                        type='number'
                        id='numOfChild'
                        name='numOfChild'
                        value={booking.numOfChild}
                        placeholder='0'
                        onChange={handleInputChange}
                        />
                            </div>

                                </div>
                                </fieldset> 
                                <div className='form-group mt-2 mb-2'>
                                    <button type='submit' className='btn btn-hotel'> Continue</button>
                                    </div>   
                        
                    </Form>
            </div>
            </div>
            <div className='col-md-6'>
                {isSubmited && (
                    <BookingSummary booking={booking} payment={calculatePayment()} isFormValid={isValidated} onConfirm={handleBooking}/>
                )}
            </div>
        </div>

    </div>
    </>
  )
}

export default BookingForm
