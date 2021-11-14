import React from "react";
import { Modal } from "../../context/Modal";
import { useListModal } from "../../context/ListModal";
import AddFunds from "./AddFunds";
import "./AddFunds.css";

const AddFundsModal = () => {
  const { bool, setBool } = useListModal();

  return (
    <>
      <button
        type="button"
        className="add_funds_button"
        onClick={() => {
          setBool(true);
          setTimeout(() => {
            document
              .getElementById("modal-background")
              .classList.add("modal-change");
          }, 1);
          return;
        }}
      >
        <h4 className="add_funds_button_text">Add Funds</h4>
      </button>
      {bool && (
        <Modal
          onClose={() => {
            return
            document
              .getElementById("modal-background")
              .classList.remove("modal-change");
            setBool(false);
          }}
        >
          <AddFunds />
        </Modal>
      )}
    </>
  );
};

export default AddFundsModal;
