import PropTypes from "prop-types";
import {
  Form,
  redirect,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import { createAppointment, updateOneAppointment } from "../services/axios";

export default function CreateForm({ setIsOpen }) {
  // useLoaderData() is a hook that returns the data - be sure to DESTRUCTURE it!
  const { AppointmentsData } = useLoaderData();

  console.log(AppointmentsData);
  // If we have this, we will populate the form with the data of the current user
  const { id } = useParams();
  const currentAppointment = AppointmentsData.find(
    (appointment) => appointment.id === id
  );

  const submit = useSubmit();

  return (
    <div className="">
      <Form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target;
          const fd = new FormData(form);
          if (currentAppointment) fd.set("id", currentAppointment.id);

          // Clear the form before submitting
          form.reset();
          submit(fd, { method: "post" });
          setIsOpen(false);
        }}
      >
        <div className="container">
          <input
            type="text"
            name="clientName"
            placeholder="Name"
            className="form--input"
            defaultValue={currentAppointment?.clientName}
            required
          />
          <input
            type="text"
            name="clientPhoneNumber"
            placeholder="Phone Number"
            className="form--input "
            defaultValue={currentAppointment?.clientPhoneNumber}
            required
          />
        </div>
        <div className="container">
          <label htmlFor="Appointment Date" className="mt-2 ml-4">
            Appointment Date:
          </label>
          <input
            id="AppointmentDate"
            type="datetime-local"
            name="appointment_date"
            className="form--input"
            defaultValue={currentAppointment?.appointment_date}
            required
          />
        </div>

        <div className="container">
          <div>
            <select
              id="deposit"
              name="deposit"
              className="form--input"
              defaultValue={currentAppointment?.deposit}
              required
            >
              <option value="">Select Yes or No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <input
            type="text"
            name="price"
            placeholder="Service Fee"
            className="form--input"
            defaultValue={currentAppointment?.price}
            required
          />
        </div>

        <div className="container">
          <div>
            <select
              id="stylistName"
              name="stylistName"
              className="form--input"
              defaultValue={currentAppointment?.stylistName}
              required
            >
              <option value="">Select a Stylist </option>
              <option value="Melanie">Melanie</option>
              <option value="Brenda">Brenda</option>
              <option value="Chloe">Chloe</option>
              <option value="Jeanne">Jeanne</option>
            </select>
          </div>
          <div>
            <select
              id="service"
              name="service"
              className="form--input"
              defaultValue={currentAppointment?.service}
              required
            >
              <option value="">Select a Service</option>
              <option value="twist">Twist</option>
              <option value="braid">Braid</option>
              <option value="weave">Weave</option>
              <option value="Senegalese">Senegalese</option>
              <option value="cut">Cut</option>
            </select>
          </div>
        </div>
        <div className="container">
          <button
            className="cancelBtn ml-14"
            type="submit"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="primaryBtn mr-12" type="submit">
            {currentAppointment ? "Edit" : "Create"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const fd = await request.formData();
  const createdEditedAppointment = Object.fromEntries(fd.entries());

  try {
    const { id } =
      // 'id' may or may not be defined depending on whether we are creating or updating
      createdEditedAppointment.id
        ? await updateOneAppointment(createdEditedAppointment.id, {
            appointment_date: createdEditedAppointment.appointment_date,
            clientName: createdEditedAppointment.clientName,
            clientPhoneNumber: createdEditedAppointment.clientPhoneNumber,
            stylistName: createdEditedAppointment.stylistName,
            service: createdEditedAppointment.service,
            deposit: createdEditedAppointment.deposit,
            price: createdEditedAppointment.price,
          })
        : await createAppointment(createdEditedAppointment);

    // Must return a redirect action

    return redirect(`/appointment/${id}`);
  } catch (error) {
    // TODO: redirect to error page
    console.error(error);
  }
};

CreateForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
