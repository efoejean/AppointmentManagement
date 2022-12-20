/* eslint-disable no-plusplus */
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { getAppointments } from "../services/axios";
import { organizeAppointments } from "../utils";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Scheduler() {
  const eventStyleGet = (event) => {
    const newStyle = {
      backgroundColor: "green",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    if (event.stylist === "Melanie") {
      newStyle.backgroundColor = "red";
    } else if (event.stylist === "Brena") {
      newStyle.backgroundColor = "blue";
    } else if (event.stylist === "Stylist 3") {
      newStyle.backgroundColor = "green";
    }

    return {
      style: newStyle,
    };
  };

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
  console.log(appointments);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: 20 }}
        eventPropGetter={eventStyleGet}
      />
    </div>
  );
}
