import { useContext, useReducer, createContext, } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import reducer from "./reducer"

import {
    TOGGLE_MENU,
    TOGGLE_PROFILE_MENU,
    TOGGLE_ADMIN_MENU,
    TOGGLE_SEARCH,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
} from "./action"


const initialState = {
    isLoading: false,
    isRLLoading: false,
    userLoading: false,
    toggleMenu: false,
    toggleProfileMenu: false,
    toggleAdminMenu: false,
    toggleSearch: false,
    user: [],
    msg: ''

}

const Context = createContext({})

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    axios.defaults.withCredentials = true;
    const authFetch = axios.create({
        baseURL: '/api',
        withCredentials: true,
        crossDomain: true,
    });


    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error)
        }
    )


    // const controller = new AbortController();
    // const { signal } = controller;

    const toggleMenuFn = () => {
        dispatch({ type: TOGGLE_MENU })
    }


    const toggleProfileMenuFn = () => {
        dispatch({ type: TOGGLE_PROFILE_MENU })
    }

    const toggleAdminMenuFn = () => {
        dispatch({ type: TOGGLE_ADMIN_MENU })
    }

    const toggleSearchFn = () => {
        dispatch({ type: TOGGLE_SEARCH })
    }

    const registerFn = async (userData) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await authFetch.post(
                "/register",
                userData
            );
            // authFetch
            const { user } = response.data;
            console.log(user);
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user },
            });
            toast.success("User Created!,  Redirecting.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { error },
            });
        }
    };

    const loginFn = async (userData) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            const { data } = await authFetch.post(
                "/login",
                userData
            );
            const { user } = data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user },
            });
            toast.success("Login Successful!,  Redirecting.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            dispatch({
                type: LOGIN_USER_ERROR,
            });
        }
    };


    const logoutUser = async () => {
        try {
            await authFetch.post("/logout");
            dispatch({ type: LOGOUT_USER });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Context.Provider value={{ ...state, toggleMenuFn, toggleSearchFn, loginFn, registerFn, logoutUser, toggleAdminMenuFn, toggleProfileMenuFn }} >
            {children}
        </Context.Provider>
    )
}

const useAppContext = () => {
    return useContext(Context)
}

export { ContextProvider, useAppContext, initialState };