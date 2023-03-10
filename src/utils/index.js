const addAppointmentDetails = (appoint) => ({
  // TODO: See if we can clean up duplicate values in the object
  ...appoint,
  start: new Date(appoint.appointment_date),
  end: new Date(appoint.appointment_date),
  stylist: appoint.stylistName,
  title: appoint.clientName,
});

export const organizeAppointments = (appointList) =>
  appointList.map(addAppointmentDetails);

// Return a single page of appointments
export const paginateAppointments = ({
  appointList,
  currentPage,
  rowsPerPage,
}) =>
  appointList.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

export const filterAppointments = (appointList, search) => {
  if (search === "") return appointList;
  return appointList.filter((appoint) => {
    const { clientName, clientPhoneNumber, stylistName } = appoint;
    return (
      clientName.toLowerCase().includes(search.toLowerCase()) ||
      clientPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
      stylistName.toLowerCase().includes(search.toLowerCase())
    );
  });
};
