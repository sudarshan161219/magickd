import {
    TOGGLE_MENU,
    TOGGLE_SEARCH,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
} from "./action"


import { initialState } from "./Context";

const reducer = (state, action) => {

    if (action.type === TOGGLE_MENU) {
        return {
            ...state,
            toggleMenu: !state.toggleMenu
        }
    }

    if (action.type === TOGGLE_SEARCH) {
        return {
            ...state,
            toggleSearch: !state.toggleSearch,
        }
    }



    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state,  isRLLoadin: true };
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
             isRLLoadin: false,
            user: action.payload.user,
        };
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
             isRLLoadin: false,
            msg: action.payload.msg
        };
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state,  isRLLoadin: true };
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
             isRLLoadin: false,
            user: action.payload.user,
        };
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
             isRLLoadin: false,
        };
    }


    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            userLoading: false
        };
    }

    throw new Error(`no such action : ${action.type}`);
}

export default reducer;