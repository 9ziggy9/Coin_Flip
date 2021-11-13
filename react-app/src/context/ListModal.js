import { createContext, useContext, useState } from "react";

const ListModalContext = createContext()

export const ListModalProvider = (props) => {
    const [modal, setShowModal] = useState(false)

    return (
        <ListModalContext.Provider value={{ modal, setShowModal }}>
          {props.children}
        </ListModalContext.Provider>
      );
}

export const useListModal = () => useContext(ListModalContext)
