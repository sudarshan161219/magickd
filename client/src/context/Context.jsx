import { useContext, useReducer, createContext, useEffect, } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import reducer from "./reducer"

import {
    TOGGLE_MENU,
    TOGGLE_PROFILE_MENU,
    TOGGLE_ADMIN_MENU,
    TOGGLE_SEARCH,
    TOGGLE_AUTH_MODAL,
    QAUTH_BEGIN,
    QAUTH_SUCCESS,
    QAUTH_ERROR,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_ERROR,
    LOGOUT_USER,
    QLOGOUT_USER,
    GET_PRODUCT_BEGIN,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR,

} from "./action"


const initialState = {
    isLoading: false,
    isRLLoading: false,
    userLoading: false,
    toggleMenu: false,
    toggleProfileMenu: false,
    toggleAdminMenu: false,
    toggleAuthModal: false,
    toggleSearch: false,
    user: [],

    product: [],
    search: '',
    category: 'all',
    sort: 'latest',
    // tag: ' all',
    price: 0,
    products: [],
    totalproducts: 0,
    numofPages: 1,
    page: 1,
}

const Context = createContext({})

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    axios.defaults.withCredentials = true;
    const authFetch = axios.create({
        withCredentials: true,
        crossDomain: true,
    });

    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                // logoutUser();
                console.log('  logoutUser()');
            }
            return Promise.reject(error)
        }
    )

    const controller = new AbortController();
    const { signal } = controller;

    const toggleMenuFn = () => {
        dispatch({ type: TOGGLE_MENU })
    }


    const toggleProfileMenuFn = () => {
        dispatch({ type: TOGGLE_PROFILE_MENU })
    }

    const toggleAdminMenuFn = () => {
        dispatch({ type: TOGGLE_ADMIN_MENU })
    }

    const toggleAuthModalFn = () => {
        dispatch({ type: TOGGLE_AUTH_MODAL })
    }

    const toggleSearchFn = () => {
        dispatch({ type: TOGGLE_SEARCH })
    }


    const qAuthFn = async () => {
        dispatch({ type: QAUTH_BEGIN });
        try {
            const { data } = await authFetch.get(
                "/api/auth/login/success", { withCredentials: true }
            );

            if (data) {
                const { user } = data;
                dispatch({
                    type: QAUTH_SUCCESS,
                    payload: { user },
                });
            }
        } catch (error) {

            dispatch({
                type: QAUTH_ERROR,
                payload: { error },
            });
        }
    };

    //> user register _ login
    const registerFn = async (userData) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await authFetch.post(
                "/api/user/register",
                userData
            );
            // authFetch
            const { user } = response.data;
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
                "/api/user/login",
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

    const getCurrentUser = async () => {
        dispatch({ type: GET_CURRENT_USER_BEGIN });
        try {
            const { data } = await authFetch('/api/user/getUser', { signal });
            const { user } = data;

            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                payload: { user },
            });
        } catch (error) {
            dispatch({ type: GET_CURRENT_USER_ERROR })
            if (signal.aborted) return;
            if (error.response && error.response.status === 401) {
                console.log('  logoutUser()');
                return;
            }
        }
    };

    const logoutUser = async () => {
        try {
            await authFetch.post("/api/user/logout");
            dispatch({ type: LOGOUT_USER });
        } catch (error) {
            console.log(error);
        }
    };


    const QlogoutUser = async () => {
        try {
            await authFetch.get("/api/auth/qauth_logout");
            dispatch({ type: QLOGOUT_USER });
        } catch (error) {
            console.log(error);
        }
    };



    const getProductFn = async () => { 
        dispatch({ type: GET_PRODUCT_BEGIN });
        try {
            const { data } = await authFetch.get( '/api/auth/getItem');
            const { products, totalProducts, numofPages } = data;
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: { products, totalProducts, numofPages },
            });
            // dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            dispatch({
                type: GET_PRODUCT_ERROR,
            });
        }
    }


    useEffect(() => {
        qAuthFn()
        getCurrentUser();
    }, [])


    return (
        <Context.Provider value={{ ...state, toggleMenuFn, toggleSearchFn, loginFn, registerFn, logoutUser, toggleAdminMenuFn, toggleProfileMenuFn, toggleAuthModalFn, QlogoutUser, getProductFn }} >
            {children}
        </Context.Provider>
    )
}

const useAppContext = () => {
    return useContext(Context)
}

export { ContextProvider, useAppContext, initialState };