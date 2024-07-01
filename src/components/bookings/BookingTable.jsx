import React, { useEffect, useState } from 'react'
import parseISO from 'date-fns/parseISO'
import DateSlider from '../common/DateSlider'
const BookingTable = ({bookingInfo,handleBookingCancellation,}) => {
    const [filteredBookings,setFilteredBookings]=useState(bookingInfo)
    const filterBookings=(startDate,endDate)=>{
        let filtered=bookingInfo
        if(startDate && endDate){
            filtered=bookingInfo.filter((booking)=>{
				const [year, month, day] = booking.checkInDate;

				const checkInDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const bookingStartDate=parseISO(checkInDate)
				const[year1,month1,day1]=booking.checkOutDate
				const checkOutDate = `${year1}-${String(month1).padStart(2, '0')}-${String(day1).padStart(2, '0')}`;
                const bookingEndDate=parseISO(checkOutDate)
                return bookingStartDate>=startDate && bookingEndDate<=endDate && bookingEndDate> startDate
            })
        }
        setFilteredBookings(filtered)
    }
	
    useEffect(()=>{
        setFilteredBookings(bookingInfo)
    },[bookingInfo])
  return (
    <section className='p-4'>
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
      <table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check-In Date</th>
						<th>Check-Out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guest</th>
						<th>Confirmation Code</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking, index) => (
						<tr key={booking.bookingId}>
							<td>{index + 1}</td>
							<td>{booking.bookingId}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{booking.checkInDate}</td>
							<td>{booking.checkOutDate}</td>
							<td>{booking.guestFullName}</td>
							<td>{booking.email}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChild}</td>
							<td>{booking.totalNumOfguests}</td>
							<td>{booking.bookingConfirmationId}</td>
							<td>
							<button
									className="btn btn-danger btn-sm"
									onClick={() => handleBookingCancellation(booking.bookingId)}>
									Cancel 
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
      {filterBookings.length ===0 && <p>No bookings Found</p>}
    </section>
  )
}

export default BookingTable
