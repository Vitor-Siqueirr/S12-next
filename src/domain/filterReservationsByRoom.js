export const filterReservationsByRoom = (reservations, room) => {
  return reservations.filter((reservation) => reservation.room.id === room.id);
};
