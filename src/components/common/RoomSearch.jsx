import React, { useState } from 'react'
import moment from 'moment'
import { getAvailableRoom } from '../utils/ApiFuncions'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchResult from './RoomSearchResult'
const RoomSearch = () => {
    const [searchQuery,setSearchQuery]=useState({
        checkInDate:"",
        checkOutDate:"",
        roomType:""
    })
    const [errorMessage,setErrorMessage]=useState("")
    const [availableRooms,setAvailableRooms]=useState([])
    const[isLoading,setIsLoading]=useState(false)
    const handleSearch=  (e)=>{
        e.preventDefault();
        const checkIn=moment(searchQuery.checkInDate)
        const checkOut=moment(searchQuery.checkOutDate)
        if(!checkIn.isValid() || !checkOut.isValid()){
            setErrorMessage("please enter valid Date range ")
            return 
        }
        if(!checkOut.isSameOrAfter(checkIn)){
            setErrorMessage("Check In Date must come befor check out date ")
            return 
        }
        setIsLoading(true)
        getAvailableRoom(searchQuery.checkInDate,searchQuery.checkOutDate,searchQuery.roomType).then((response)=>{
                setAvailableRooms(response.data)
                setTimeout(()=>{
                    setIsLoading(false)
                })
            }).catch((error)=>(
                setErrorMessage(error.message)
            )).finally(()=>{
                setIsLoading(false)
            })
    }
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkIn=moment(searchQuery.checkInDate)
        const checkOut=moment(searchQuery.checkOutDate)
        if(checkIn.isValid() && checkOut.isValid()){
            setErrorMessage("")
        }

    }
    const clearSearch=(()=>{
        setSearchQuery({
            checkInDate:"",
            checkOutDate:"",
            roomType:""
        })
        setAvailableRooms([])
    })
  return (
    <>
    <Container className='mt-5 mb-5 py-5 shadow'>
        <Form onSubmit={handleSearch}>
            <Row className='justify-content-center'>
                <Col xs={12} md={3}>
                    <Form.Group controlId='checkInDate'>
                        <Form.Label>Check In Date</Form.Label>
                        <Form.Control type='date' name='checkInDate' value={searchQuery.checkInDate} 
                        onChange={handleInputChange}
                        min={moment().format("YYYY-MM-DD")}/>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group controlId='checkOutDate'>
                        <Form.Label>Check Out Date</Form.Label>
                        <Form.Control type='date' name='checkOutDate' value={searchQuery.checkOutDate} 
                        onChange={handleInputChange}
                        min={moment().format("YYYY-MM-DD")}/>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <FormGroup>
                        <Form.Label>Room Type</Form.Label>
                        <div className='d-flex'> <RoomTypeSelector handleRoomInputChange={handleInputChange}
                        newRoom={searchQuery}/>
                        <Button variant='secondary' type='submit' className='ml-2'>Search</Button> </div>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
        {isLoading?(
            <p>Finding Available Rooms</p>
        ):availableRooms?(
            <RoomSearchResult results={availableRooms} onClearSearch={clearSearch}/>
        ):(
            <p>No rooms Availble for selected Date and room Type</p>
        )}
        {errorMessage && <p className='text-danger'>Sorry Error :{errorMessage}</p>}
    </Container>
      
    </>
  )
}

export default RoomSearch
