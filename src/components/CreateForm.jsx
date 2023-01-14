import PropTypes from "prop-types";
import { Form, useLoaderData, useParams, useSubmit } from "react-router-dom";

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
            value={currentAppointment?.clientName}
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
            <fieldset>
              <legend className="mb-1">Deposit</legend>
              <label htmlFor="yes">Yes</label>
              <input
                id="yes"
                type="radio"
                name="deposit"
                defaultValue="yes"
                className="ml-1"
                checked={currentAppointment?.deposit === "yes"}
              />
              <label className="ml-4" htmlFor="no">
                No
              </label>
              <input
                className="ml-1"
                id="no"
                type="radio"
                name="deposit"
                defaultValue="no"
                checked={currentAppointment?.deposit === "no"}
              />
            </fieldset>
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
              value={currentAppointment?.service}
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
            Create
          </button>
        </div>
      </Form>
    </div>
  );
}

CreateForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
