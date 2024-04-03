import { useEffect } from "react";
import { useRouter } from "next/router";
import { uniqBy } from "lodash";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";

export default function Students({ students }) {
  const router = useRouter();

  useEffect(() => {
    const firstStudentId = students[0].id;
    router.push(`/students/${firstStudentId}`);
  }, [students, router]);

  return <>Loading...</>;
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
      students: students,
    },
  };
};
