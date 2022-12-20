import PropTypes from "prop-types";
import { useState } from "react";
import { createAppointment } from "../services/axios";

export default function CreateForm({ setIsOpen }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhoneNumber: "",
    appointment_date: "",
    deposit: "",
    price: "",
    stylistName: "",
    service: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((PrevState) => ({
      ...PrevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    createAppointment(formData).then((response) => {
      // todo: add a toast message

      setIsOpen(false);
    });
  };
  return (
    <div className="">
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <input
            type="text"
            name="clientName"
            placeholder="Name"
            className="form--input"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="clientPhoneNumber"
            placeholder="Phone Number"
            className="form--input "
            value={formData.clientPhoneNumber}
            onChange={handleChange}
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
            value={formData.appointment_date}
            onChange={handleChange}
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
                value="yes"
                className="ml-1"
                checked={formData.deposit === "yes"}
                onChange={handleChange}
              />
              <label className="ml-4" htmlFor="no">
                No
              </label>
              <input
                className="ml-1"
                id="no"
                type="radio"
                name="deposit"
                value="no"
                checked={formData.deposit === "no"}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <input
            type="text"
            name="price"
            placeholder="Service Fee"
            className="form--input"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="container">
          <div>
            <select
              id="stylistName"
              name="stylistName"
              className="form--input"
              value={formData.stylistName}
              onChange={handleChange}
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
              value={formData.service}
              onChange={handleChange}
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
      </form>
    </div>
  );
}

CreateForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
