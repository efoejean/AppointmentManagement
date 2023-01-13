import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Table from "./components/Table/Table";
import User from "./components/User";
import Appointments from "./routes/Appointments";
import Root from "./routes/Root";
import {
  createAppointment,
  getAppointments,
  updateOneAppointment,
} from "./services/axios";

import "./index.css";

const createEditUser = async ({ request }) => {
  const fd = await request.formData();
  const createdEditedUser = Object.fromEntries(fd.entries());

  try {
    const { id } =
      // 'id' may or may not be defined depending on whether we are creating or updating
      createdEditedUser.id
        ? await updateOneAppointment(createdEditedUser.id, createdEditedUser)
        : await createAppointment(createdEditedUser);

    // Must return a redirect action
    return redirect(`/${id}`);
  } catch (error) {
    // TODO: redirect to error page
    console.error(error);
  }
};

const loadUsers = async () => {
  const users = await getAppointments();

  return { users };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loadUsers,
    action: createEditUser,
    children: [
      {
        path: "",
        element: <Table />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
        loader: loadUsers,
        action: createEditUser,
      },
      {
        path: "/appointment/:id",
        element: <User />,
      },
      {
        path: ":id",
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: redirect("/"),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
