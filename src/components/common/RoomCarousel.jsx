import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAllRooms } from '../utils/ApiFuncions';
import { Link } from 'react-router-dom'
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap'
const RoomCarousel = () => {
    const[rooms,setRooms]=useState([ {id:"",roomType:"",price:"" ,photo:""}])
    const[errorMessage,setErrorMessage]=useState("")
    const[isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        setIsLoading(true)
        getAllRooms().then((data)=>{
            setRooms(data)
            setIsLoading(false)
        }).catch((error)=>{
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    },[])
    if(isLoading){
        return <div className='mt-5'> Loading Rooms.....</div>
    }
    if(errorMessage){
        return <div className='text-danger mb-5 mt-5'> Error :{errorMessage}</div>
    }
  return (
    <section className='bg-light mb-5 mt-5 shadow'>
        <Link to={'/browseAllRooms'} className='hotel-color text-center'>
            Browse All Rooms
        </Link>
        <Container>
            <Carousel indicators={false}>
            {[...Array(Math.ceil(rooms.length/4))].map((_,index)=>(
                <Carousel.Item key={index}>
                    <Row>
                        {rooms.slice(index * 4,index*4+4).map((room)=>(
                            <Col key={room.id} className='mb-4' xs={12} md={6} lg={3}> 
                            <Card>
                                <Link to={`/bookRoom/${room.id}`}>
                                    <Card.Img variant='top'
                                    src={`data:image/png;base64, ${room.photo}`}
                                    alt='Room Photo'
                                    className='w-100'
                                    style={{height:"200px"}}>
                                    </Card.Img>
                                </Link>
                                <Card.Body>
                                <div className="flex-grow-1 ml-3 px-5">
						<Card.Title className="hotel-color">{room.roomType}</Card.Title>
						<Card.Title className="room-price">{room.price} / night</Card.Title>
						<Card.Text>Some room information goes here for the guest to read through</Card.Text>
					</div>
					<div className="flex-shrink-0">
						<Link to={`/bookRoom/${room.id}`} className="btn btn-hotel btn-sm">
							Book Now
						</Link>
					</div>
                    </Card.Body>
                                </Card>
                                </Col>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
            </Carousel>
        </Container>
      
    </section>
  )
}

export default RoomCarousel
