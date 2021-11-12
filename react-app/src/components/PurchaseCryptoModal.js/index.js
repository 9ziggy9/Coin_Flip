import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PurchaseCryptoPage from '../PurchaseCryptoPage';

function PurchaseCryptoModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <PurchaseCryptoPage />
          </Modal>
        )}
      </>
    );

}

export default PurchaseCryptoModal;
