import { createContext, useContext, useState } from "react";

const FreeModalContext = createContext()

export const FreeModalProvider = (props) => {
    const [free, setFree] = useState(false)

    return (
        <FreeModalContext.Provider value={{ free, setFree }}>
          {props.children}
        </FreeModalContext.Provider>
      );
}

export const useFreeModal = () => useContext(FreeModalContext)
