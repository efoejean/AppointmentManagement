import { RiCloseLine } from "react-icons/ri";

import PropTypes from "prop-types";
import CreateForm from "./CreateForm";

export default function AppointmentModal({ setIsOpen }) {
  return (
    <div className="darkBG">
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h2 className="heading">Create Appointment</h2>
          </div>
          <button
            className="closeBtn"
            type="submit"
            onClick={() => setIsOpen(false)}
          >
            <RiCloseLine />
          </button>
          <div className="modalContent">
            <div>
              <CreateForm setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AppointmentModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
