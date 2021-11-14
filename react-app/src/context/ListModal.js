import { createContext, useContext, useState } from "react";

const ListModalContext = createContext()

export const ListModalProvider = (props) => {
    const [modal, setShowModal] = useState(false)
    const [bool, setBool] = useState(false)
    const [shown, setShown] = useState(false)

    return (
        <ListModalContext.Provider value={{ modal, setShowModal, bool, setBool, shown, setShown }}>
          {props.children}
        </ListModalContext.Provider>
      );
}

export const useListModal = () => useContext(ListModalContext)
