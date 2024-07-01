import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

const Logout = () => {
    const auth=useContext(AuthContext)
    const navigate=useNavigate()
    const Logout=()=>{
        auth.handleLogout()
        navigate("/", {state:{message:"You have been logout!"}})
        window.location.reload();
    }
    const isLoggedIn=localStorage.getItem("token")

  return isLoggedIn?(
    <>
    <ul>
      <li>
        <Link className='dropdown-item' to={'/profile'}>Profile</Link>
      </li>
				<hr className="dropdown-divider" />
      <li><button className='dropdown-item' onClick={Logout}>Logout</button></li>
      
      </ul>
    </>
  ):null
}

export default Logout
