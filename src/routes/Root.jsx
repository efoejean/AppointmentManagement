import { Link, Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/navbar";
import { getAppointments } from "../services/axios";

export async function loader() {
  const appointments = await getAppointments();
  const appointmentsData = appointments.map((appointment) => {
    return {
      ...appointment,
      start: new Date(appointment.appointment_date),
      end: new Date(appointment.appointment_date),
      stylist: appointment.stylistName,
      title: appointment.clientName + " / " + appointment.service,
    };
  });
  return { appointmentsData };
}

export default function Root() {
  const { appointmentsData } = useLoaderData();
  return (
    <div>
      <>
        <Navbar />
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            {appointmentsData.length ? (
              <ul>
                {appointmentsData.map((contact) => (
                  <li key={contact.id}>
                    <Link to={`contacts/${contact.id}`}>
                      {contact.clientPhoneNumber || contact.clientName ? (
                        <>
                          {contact.clientPhoneNumber} {contact.clientName}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </>
    </div>
  );
}
