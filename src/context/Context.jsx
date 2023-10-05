import { useContext, useReducer, createContext } from "react";
import reducer from "./reducer"
import { TOGGLE_MENU, TOGGLE_SEARCH } from "./action"


const initialState = {
    toggleMenu: false,
    toggleSearch: false
}

const Context = createContext({})

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)



    const toggleMenuFn = () => {
        dispatch({ type: TOGGLE_MENU })
    }

    const toggleSearchFn = () => {
        dispatch({ type: TOGGLE_SEARCH })
    }

    return (
        <Context.Provider value={{ ...state, toggleMenuFn, toggleSearchFn }} >
            {children}
        </Context.Provider>
    )
}

const useAppContext = () => {
    return useContext(Context)
}

export { ContextProvider, useAppContext, initialState };