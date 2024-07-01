import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
            <h3> Experience the best hospitality at <span className='hotel-color'> Hotel Corporate Heaven </span> </h3>
            <h4>We offer the best service for all your needs </h4>
        </div>
      </Container>
    </div>
  )
}

export default Parallax
