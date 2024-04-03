export const filterReservationsByStudent = (reservations, student) => {
  return reservations.filter(
    (reservation) => reservation.student.id === student.id
  );
};
