import { filterReservationsByStudent } from "@/domain/filterReservationsByStudent";
import { Calendar } from "@/ui/components/Calendar";
import { useRouter } from "next/router";
import cx from "@/ui/styles/Reservations.module.scss";
import {
  fetchReservations,
  fetchStudents,
} from "@/infrastructure/inner/fetchReservations";
import { mapReservationsToCalendarEntries } from "@/utils/mapReservations";

export default function StudentsId({ reservations, students, id }) {
  const router = useRouter();

  const selectedStudentId = Number(id);
  const selectedStudent = students.find(
    (student) => student.id === selectedStudentId
  );

  const selectedStudentReservations = filterReservationsByStudent(
    reservations,
    selectedStudent
  );

  const studentEntries = mapReservationsToCalendarEntries(
    selectedStudentReservations
  );

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
          data-testid="select-room"
          className={cx.selectRoom}>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar
          entries={studentEntries}
          data-value={studentEntries}
          data-testid="calendar-data"
        />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const students = await fetchStudents();

  const paths = students.map((student) => ({
    params: { id: student.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const reservations = await fetchReservations();
  const students = await fetchStudents();

  if (!students.find((student) => student.id.toString() === params.id)) {
    return {
      redirect: {
        destination: `/students/${students[0].id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      reservations: reservations,
      students: students,
      id: params.id,
    },
  };
}
