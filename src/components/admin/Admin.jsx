import React from 'react'
import { Link } from 'react-router-dom'
const Admin = () => {
  
  return (
     <section className='container mt-5'>
     
      <h2>Welcome to admin panel </h2>
      <hr />
      <Link className='nav-link hotel-color' to={'/existingRooms'}>
        <strong style={{border:'2px solid black'}}>Manage Rooms</strong>
      </Link>
      <br />
      <Link className='nav-link hotel-color' to={'/existingBookings'} >
        <strong style={{border:'2px solid black'}}>  Manage Bookings  </strong>
      </Link>
      
   </section>
    
  )
}

export default Admin
