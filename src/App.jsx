import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/rooms/AddRoom'
import ExistingRoom from './components/rooms/ExistingRoom'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import Home from './components/home/Home'
import EditRoom from './components/rooms/EditRoom'
import NavBar from './components/layout/NavBar'
import Footer from './components/common/Footer'
import RoomListing from './components/rooms/RoomListing'
import Admin from './components/admin/Admin'
import CheckOut from './components/bookings/CheckOut'
import BookingSuccess from './components/bookings/BookingSuccess'
import Bookings from './components/bookings/Bookings'
import FindBooking from './components/bookings/FindBooking'
import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import Registration from './components/auth/Registration'
import Logout from './components/auth/Logout'
import AuthProvider from './components/auth/AuthProvider'
import RequireAuth from './components/auth/RequireAuth'
function App() {
  const [count, setCount] = useState(0)
  const user=localStorage.getItem("userId")
  const roles=localStorage.getItem("userRole")

  return (
    <AuthProvider>
    <main>
     
      <Router>
      <NavBar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/edit-room/:roomId' element={user && roles==="ROLE_ADMIN" ?<EditRoom/>:<Home/> }/>
        <Route path='/existingRooms' element={user && roles==="ROLE_ADMIN" ?<ExistingRoom/>:<Home/> }/>
        <Route path='/addRoom' element={user && roles==="ROLE_ADMIN" ?<AddRoom/>:<Home/> }/>

        <Route path='/bookRoom/:roomId' element={
          <RequireAuth><CheckOut/> </RequireAuth>
        }/>
        <Route path='/browseAllRooms' element={<RoomListing/> }/>
        <Route path='/admin' element={user && roles==="ROLE_ADMIN" ?<Admin/>:<Home/> }/>
        <Route path='/existingBookings' element={user && roles==="ROLE_ADMIN" ?<Bookings/>:<Home/> }/>
        <Route path='/bookingSuccess' element={<BookingSuccess/> }/>
        <Route path='/findBooking' element={<FindBooking/> }/>
        <Route path='/login' element={<Login/> }/>
        <Route path='/logout' element={<Logout/> }/>
        <Route path='/register' element={<Registration/> }/>
        <Route path='/profile' element={<Profile/> }/>
        </Routes>
        <Footer/>
      </Router>
      
    </main>
    </AuthProvider>
  )
}

export default App
