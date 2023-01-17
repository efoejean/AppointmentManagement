/* eslint-disable camelcase */
import { Button, Toolbar } from "@mui/material";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import { TextInput } from "../components/Form";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Root() {
  // useLoaderData() is a hook that returns the data - be sure to DESTRUCTURE it!
  const { AppointmentsData } = useLoaderData();

  console.log(AppointmentsData);
  // If we have this, we will populate the form with the data of the current user
  const { id } = useParams();
  const currentAppointment = AppointmentsData.find(
    (appointment) => appointment.id === id
  );

  const submit = useSubmit();

  const tableData = AppointmentsData.map(
    ({
      id,
      appointment_date,
      clientName,
      clientPhoneNumber,
      deposit,
      service,
      price,
      status,
    }) => ({
      id,
      appointment_date: new Date(appointment_date).toLocaleDateString(),
      clientName,
      clientPhoneNumber,
      deposit,
      service,
      price: `$${price}`,
      status,
    })
  );

  return (
    <>
      <Navbar />
      <h1 className="mt-4 mb-8 text-center text-3xl font-bold underline">
        <Link to="/"></Link>
      </h1>
      <main className="mx-8 flex flex-col gap-y-4">
        <Form
          className="flex flex-col items-center border-y"
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.target;
            const fd = new FormData(form);
            if (currentAppointment) fd.set("id", currentAppointment.id);

            // Clear the form before submitting
            form.reset();
            submit(fd, { method: "post" });
          }}
        >
          <fieldset>
            <legend className="my-4 w-full text-center font-semibold">
              Create a New Contact (all fields required)
            </legend>
            <div className="flex flex-col gap-4 md:flex-row">
              <TextInput
                id="clientPhone"
                pattern="\w(\s?\w)*"
                placeholder="Full Name (e.g. John Doe)"
                defaultValue={currentAppointment?.clientPhoneNumber}
              />
              <TextInput
                id="clientName"
                pattern="\w{3,16}"
                placeholder="clientName (3-16 chars)"
                defaultValue={currentAppointment?.clientName}
              />
              <TextInput
                id="phrase"
                defaultValue={currentAppointment?.phrase}
              />
              <TextInput
                id="avatar"
                type="url"
                placeholder="Enter URL for Avatar"
                defaultValue={currentAppointment?.avatar}
              />
            </div>
          </fieldset>
          <button
            className="my-6 w-max rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
            type="submit"
          >
            {currentAppointment ? "Edit" : "Submit"}
          </button>
        </Form>

        <Toolbar>
          <SearchBar />{" "}
          <Button style={{ marginLeft: "auto" }} variant="contained">
            + Add New
          </Button>
        </Toolbar>

        <Outlet context={{ data: AppointmentsData, tableData }} />
      </main>
    </>
  );
}
