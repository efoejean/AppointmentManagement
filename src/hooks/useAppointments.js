import { useEffect, useState } from "react";
import { getAppointments } from "../api/axios";
import { organizeAppointments } from "../utils";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(
    () => {
      getAppointments().then((data) => {
        setAppointments(organizeAppointments(data));
      });
    },

    // Dep Array - leave empty to this only runs on the first side effect (browser render)
    []
  );

  return [appointments, setAppointments];
}
