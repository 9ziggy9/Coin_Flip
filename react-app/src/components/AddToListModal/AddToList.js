import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

const AddToList = ({ cryptoId }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button className="add-to-list" onClick={() => setShowModal(true)}>Add to List</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <PurchaseCryptoPage />
          </Modal>
        )}
      </>
    );
}

export default AddToList
