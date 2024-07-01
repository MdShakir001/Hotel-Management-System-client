import React, { useContext, useState } from 'react'
import { Link,NavLink } from 'react-router-dom'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/AuthProvider'
import { Image } from 'react-bootstrap'
import hotelLogo from '../../assets/images/CORPORATE.png'
import Dropdown from 'react-bootstrap/Dropdown';

const NavBar = () => {
    const [showAccount,setShowAccount]=useState(false)
    const isLoggedIn=localStorage.getItem("token")
    const userRole=localStorage.getItem("userRole")
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-0 sticky-top'>
        <div className='container-fluid'>
            
            <Link to={"/"} className='navbar-brand'>
            <Image className='mr-2' src={hotelLogo} height={80}/>
            <span className='hotel-color'> <strong>Corporate Heaven</strong> </span>
            </Link>
            <button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
            <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'> 
                    <NavLink className="nav-link " aria-current="page" to={"/browseAllRooms"} >
                    <b>Browse All Rooms</b>
                    </NavLink>
                    </li>
                    {isLoggedIn && userRole==="ROLE_ADMIN" &&( <li className='nav-item'> 
                    <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                    <b>Admin</b>
                    </NavLink>
                    </li>)}
                    

                </ul>
                <ul className='navbar-nav  align-items-center '>
                    <li className='nav-item' >
                        <Link  className="nav-link "  to={"/findBooking"}>
                            <b>Find My Booking</b>
                        </Link>
                    </li>
                    <li className='nav-item '>
                        <Dropdown className='nav-link' >
                        <Dropdown.Toggle variant="light"  id="dropdown-basic">
                        <b>Account</b>
                         </Dropdown.Toggle>

                        <Dropdown.Menu>
                         {isLoggedIn ?(
                            <Logout/>
                             
                        ):(
                         <Dropdown.Item href="/login" className='nav-link'><b>Login</b></Dropdown.Item>
                        
                        )}
                        </Dropdown.Menu>
                       
                        </Dropdown>
                                            
                    </li>

                </ul>

            </div>

        </div>
      
    </nav>
  )
}

export default NavBar
