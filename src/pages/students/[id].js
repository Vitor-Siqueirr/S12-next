import { filterReservationsByStudent } from "@/domain/filterReservationsByStudent";
import { Calendar } from "@/ui/components/Calendar";
import { useRouter } from "next/router";
import cx from "./Students.module.scss";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";
import { uniqBy } from "lodash";
import { useEffect } from "react";

export default function StudentsId({ reservations, students }) {
  const router = useRouter();
  const { id } = router.query;

  const selectedStudentId = Number(id);
  const selectedStudent = students.find(
    (student) => student.id === selectedStudentId
  );

  useEffect(() => {
    if (!selectedStudent) {
      const firstStudentId = students[0].id;
      router.push(`/students/${firstStudentId}`);
    }
  }, [students, selectedStudent, router]);

  if (!selectedStudent) {
    return <>Loading...</>;
  }

  const selectedStudentReservations = filterReservationsByStudent(
    reservations,
    selectedStudent
  );

  const entries = selectedStudentReservations.map((reservation) => ({
    id: reservation.id,
    title: `${reservation.room.number} - ${reservation.room.name}`,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id,
  }));

  const handleChangeStudent = (event) => {
    const studentId = Number(event.target.value);
    router.push(`/students/${studentId}`);
  };

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={selectedStudentId}
          onChange={handleChangeStudent}
          data-testid="select-room">
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Calendar
          entries={entries}
          data-value={entries}
          data-testid="calendar-data"
        />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  let reservations;

  await fetchReservations().then(async (data) => {
    reservations = await data;
  });

  const students = reservations
    ? uniqBy(
        reservations.map((reservation) => reservation.student),
        "id"
      )
    : undefined;

  return {
    props: {
      reservations: reservations,
      students: students,
    },
  };
};
