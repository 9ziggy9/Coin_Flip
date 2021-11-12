import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useListModal } from "../../context/ListModal";
import AddToListModal from "./AddToListModal";

const AddToList = ({ cryptoId }) => {
  const { modal, setShowModal } = useListModal()

  return (
    <>
      <button className="add-to-list" onClick={() => setShowModal(true)}>
        Add to List
      </button>
      {modal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddToListModal cryptoId={cryptoId} />
        </Modal>
      )}
    </>
  );
};

export default AddToList;
