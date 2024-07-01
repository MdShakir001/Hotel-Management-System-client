import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaMailBulk, FaMobile, FaSchool, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='text-white' style={{ backgroundColor: 'black',
        opacity: '0.8',bottom:0,position:"relative"}}>
        <div className='container text-center text-md-left'>
            <div className='row text-center text-md-left'>
                <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
                    <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Hotel Corporate Heaven</h5>
                    <p>Hotel Corporate Heaven promises luxury for the business traveler. Unwind in soundproofed rooms, enjoy top-notch meeting facilities, and energize in the on-site fitness center.!</p>
                </div>
                <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
                <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Quick Links</h5>
                    <ul className='list-unstyled list-inline'>
                        <li><NavLink aria-current="page" style={{ textDecoration: 'none', color: 'white' }} to={"/browseAllRooms"}>Browse All Rooms</NavLink></li>
                        <li><NavLink aria-current="page" style={{ textDecoration: 'none', color: 'white' }} to={"/findBookings"}>Find Your Bookings</NavLink></li>
                        <li><NavLink aria-current="page" style={{ textDecoration: 'none', color: 'white' }} to={"/"}>Raise a Query</NavLink></li>
                        <li><NavLink aria-current="page" style={{ textDecoration: 'none', color: 'white' }} to={"/"}>News & Circulars</NavLink></li>
                    </ul>
                </div>
                <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
                <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Contact Us</h5>
                    <ul className='list-unstyled list-inline'>
                        <li><h6>Hotel Corporate Heaven</h6></li>
                        <li><p><FaSchool/> Weastern Bazar, Mainatali, Mughalsarai,Uttar Pradesh 232101</p></li>
                        <li><FaMobile/>49572394857</li>
                        <li><FaMailBulk/> corparateheaven@reddifmail.com</li>
                        
                    </ul>
                </div>

            </div>
            <hr />
            <div className='row align-items-center'>
                <div className='col-md-7 col-lg-8'>
                    <p>Copyright &copy; 2024 <strong className='text-warning'>Corporate Heaven |Powered by Shakir Technologies PVT.LTD.</strong></p>

                </div>
                <div className='col-md-5 col-lg-4'>
                    <div className='text-center text-md-right'>
                        <ul className='list-unstyled list-inline'>
                            <li className='list-inline-item'>
                                <a href="#" className='btn-floating btn-sm text-white' style={{fontSize:"23px"}}><FaFacebook/></a>

                            </li>
                            <li className='list-inline-item'>
                                <a href="#" className='btn-floating btn-sm text-white' style={{fontSize:"23px"}}><FaInstagram/></a>

                            </li>
                            <li className='list-inline-item'>
                                <a href="#" className='btn-floating btn-sm text-white' style={{fontSize:"23px"}}><FaTwitter/></a>

                            </li>
                            <li className='list-inline-item'>
                                <a href="#" className='btn-floating btn-sm text-white' style={{fontSize:"23px"}}><FaLinkedin/></a>

                            </li>

                        </ul>
                    </div>

                </div>

            </div>

        </div>
      
    </footer>
  )
}

export default Footer
