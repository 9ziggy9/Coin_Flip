import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToListModal from './AddToListModal';

const AddToList = ({ cryptoId }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button className="add-to-list" onClick={() => setShowModal(true)}>Add to List</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddToListModal cryptoId={cryptoId} />
          </Modal>
        )}
      </>
    );
}

export default AddToList
