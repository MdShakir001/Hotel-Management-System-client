import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});
export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
// this function add new room to database
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  const response = await api.post("/rooms/add/newRoom", formData);
  if (response.status == 201) {
    return true;
  } else {
    return false;
  }
}
// this function get all the room types from database
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/roomTypes");
    return response.data;
  } catch (error) {
    throw new Error("Error in fetching room types");
  }
}
//this function fetch all the rooms available
export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/allRooms");
    return response.data;
  } catch (error) {
    throw new Error("Error in fetching rooms");
  }
}
//this function delete a room by id
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`);
  } catch (error) {
    throw new Error("Error in deleting room ");
  }
}
//this function update a room by id
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("photo", roomData.photo);
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.price);
  const response = await api.put(`/rooms/update/room/${roomId}`, formData);
  return response;
}
//this function get a room by id
export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/rooms/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error in fetching room");
  }
}
//this function book a room
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error in booking room :${error.message}`);
    }
  }
}
//this function get all bookings
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/allBookings");
    return result.data;
  } catch (error) {
    throw new Error(`Error in fetching bookings : ${error.message}`);
  }
}
//this function get booking by confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error in fetching booking : ${error.message}`);
    }
  }
}
export async function getBookingsByUserId(userId, token) {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("failed to fetch bookings ");
  }
}
//this function cancel booking
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(`Error in cancelling booking : ${error.message}`);
  }
}
// filter room accoring to date
export async function getAvailableRoom(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `/rooms/availableRooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result;
}
export async function userRegistration(registration) {
  try {
    const response = api.post("/auth/registerUser", registration);
    return (await response).data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.reponse.data);
    } else {
      throw new Error(`Error registering user ${error.message}`);
    }
  }
}
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getUserProfile(userId, token) {
  try {
    const response = await api.get(`user/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}
export async function getUser(userId, token) {
  try {
    const response = await api.get(`users/user/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
