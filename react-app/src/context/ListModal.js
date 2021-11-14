import { createContext, useContext, useState } from "react";

const ListModalContext = createContext()

export const ListModalProvider = (props) => {
    const [modal, setShowModal] = useState(false)
    const [bool, setBool] = useState(false)

    return (
        <ListModalContext.Provider value={{ modal, setShowModal, bool, setBool }}>
          {props.children}
        </ListModalContext.Provider>
      );
}

export const useListModal = () => useContext(ListModalContext)
