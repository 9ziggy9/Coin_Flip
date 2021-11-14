import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ResetPassword from "./ResetPassword";

const SettingsModal = ({ user }) => {
  const [modal, setShowModal] = useState(false);

  return (
    <>
      <button className="reset_password_button" onClick={() => setShowModal(true)}>
        <h4 type="button" className="reset_password_text">
          Reset Password
        </h4>
      </button>
      {modal && (
        <Modal onClose={() => setShowModal(false)}>
          <ResetPassword user={user}/>
        </Modal>
      )}
    </>
  );
};

export default SettingsModal;
