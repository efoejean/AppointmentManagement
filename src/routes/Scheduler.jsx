import format from "date-fns/format";
import getDay from "date-fns/getDay";
import { enUS } from "date-fns/locale";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Scheduler() {
  const { AppointmentsData } = useLoaderData();

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

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={AppointmentsData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: 20 }}
        eventPropGetter={eventStyleGet}
      />
    </div>
  );
}
