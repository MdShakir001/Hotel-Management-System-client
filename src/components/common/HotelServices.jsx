import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelServices = () => {
  return (
    <>
    <Container className='mb-2'>
        <Header title={"Our Services "}/>
        <Row >
        <h4 className='text-center'>
            Services At <span className='hotel-color'> Hotel Corporate Heaven </span>
            <span className='gap-2'>  <FaClock/> -24/7 Front Desk</span> 
            </h4>
        </Row>
        <hr />
        <Row  xs={1} md={2} lg={3} className='g-4 mt-2'>
            <Col>
            <Card>
                <Card.Body>
                    <Card.Title className='hotel-color'>
                        <FaWifi/> Wifi
                    </Card.Title>
                    <Card.Text>Stay Connected with high speed Internet </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title className='hotel-color'>
                        <FaUtensils/> BreakFast
                    </Card.Title>
                    <Card.Text>A Healthy BreakFast to Start your day  </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card>
                <Card.Body>
                    <Card.Title className='hotel-color'>
                        <FaUtensils/> BreakFast
                    </Card.Title>
                    <Card.Text>A Healthy BreakFast to Start your day  </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title className='hotel-color'>
                        <FaUtensils/> BreakFast
                    </Card.Title>
                    <Card.Text>A Healthy BreakFast to Start your day  </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title className='hotel-color'>
                        <FaUtensils/> BreakFast
                    </Card.Title>
                    <Card.Text>A Healthy BreakFast to Start your day  </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title className='hotel-color'>
                        <FaUtensils/> BreakFast
                    </Card.Title>
                    <Card.Text>A Healthy BreakFast to Start your day  </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            

        </Row>

    </Container>
      
    </>
  )
}

export default HotelServices
