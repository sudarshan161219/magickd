import {
    TOGGLE_MENU,
    TOGGLE_PROFILE_MENU,
    TOGGLE_ADMIN_MENU,
    TOGGLE_SEARCH,
    TOGGLE_AUTH_MODAL,
    QAUTH_BEGIN,
    QAUTH_SUCCESS,
    QAUTH_ERROR,
    TOGGLE_EDIT_USER_BEGIN,
    TOGGLE_EDIT_USER_SUCCESS,
    TOGGLE_EDIT_USER_ERROR,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_ADMIN_BEGIN,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_ERROR,
    LOGIN_ADMIN_BEGIN,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_ERROR,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_QUSER_SUCCESS,
    GET_CURRENT_USER_ERROR,
    GET_ADMIN_BEGIN,
    GET_ADMIN_SUCCESS,
    GET_ADMIN_ERROR,
    UPLOAD_ITEM_BEGIN,
    UPLOAD_ITEM_SUCCESS,
    UPLOAD_ITEM_ERROR,
    LOGOUT_USER,
    QLOGOUT_USER,
    GET_PRODUCT_BEGIN,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR,
    SAVE_PRODUCT_BEGIN,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_ERROR,
    SAVED_PRODUCT_BEGIN,
    SAVED_PRODUCT_SUCCESS,
    SAVED_PRODUCT_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
    PURCHASED_PRODUCT_BEGIN,
    PURCHASED_PRODUCT_SUCCESS,
    PURCHASED_PRODUCT_ERROR,
    TOGGLE_THEME
} from "./action"


import { initialState } from "./Context";

const reducer = (state, action) => {

    if (action.type === TOGGLE_MENU) {
        return {
            ...state,
            toggleMenu: !state.toggleMenu
        }
    }

    if (action.type === TOGGLE_PROFILE_MENU) {
        return {
            ...state,
            toggleProfileMenu: !state.toggleProfileMenu
        }
    }

    if (action.type === TOGGLE_ADMIN_MENU) {
        return {
            ...state,
            toggleAdminMenu: !state.toggleAdminMenu
        }
    }

    if (action.type === TOGGLE_AUTH_MODAL) {
        return {
            ...state,
            toggleAuthModal: !state.toggleAuthModal
        }
    }

    if (action.type === TOGGLE_SEARCH) {
        return {
            ...state,
            toggleSearch: !state.toggleSearch,
        }
    }

    if (action.type === TOGGLE_EDIT_USER_BEGIN) {
        return { ...state, isRLLoadin: true };
    }

    if (action.type === TOGGLE_EDIT_USER_SUCCESS) {
        return {
            ...state,
            isRLLoadin: false,
            user: action.payload.user,
        };
    }

    if (action.type === TOGGLE_EDIT_USER_ERROR) {
        return {
            ...state,
            isRLLoadin: false,
            msg: action.payload.msg
        };
    }

    if (action.type === QAUTH_BEGIN) {
        return { ...state, isRLLoading: true };
    }

    if (action.type === QAUTH_SUCCESS) {
        return {
            ...state,
            isRLLoading: false,
            user: action.payload.user,
        };
    }

    if (action.type === QAUTH_ERROR) {
        return {
            ...state,
            isRLLoading: false,
            msg: action.payload.msg
        };
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isRLLoading: true };
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isRLLoading: false,
            user: action.payload.user,
            toggleAuthModal: false
        };
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isRLLoading: false,
            msg: action.payload.msg
        };
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isRLLoading: true };
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isRLLoading: false,
            user: action.payload.user,
            toggleAuthModal: false
        };
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isRLLoading: false,
        };
    }

    if (action.type === REGISTER_ADMIN_BEGIN) {
        return { ...state, isAdminLoading: true };
    }

    if (action.type === REGISTER_ADMIN_SUCCESS) {
        return {
            ...state,
            isAdminLoading: false,
            admin: action.payload.user,
        };
    }

    if (action.type === REGISTER_ADMIN_ERROR) {
        return {
            ...state,
            isAdminLoading: false,
        };
    }

    if (action.type === LOGIN_ADMIN_BEGIN) {
        return { ...state, isAdminLoading: true };
    }

    if (action.type === LOGIN_ADMIN_SUCCESS) {
        return {
            ...state,
            isAdminLoading: false,
            admin: action.payload.user,
        };
    }

    if (action.type === LOGIN_ADMIN_ERROR) {
        return {
            ...state,
            isAdminLoading: false,
        };
    }

    if (action.type === GET_CURRENT_USER_BEGIN) {
        return {
            ...state,
            userLoading: true
        }
    }

    if (action.type === GET_CURRENT_USER_SUCCESS) {

        return {
            ...state,
            userLoading: false,
            user: action.payload.user,
        }
    }

    if (action.type === GET_CURRENT_QUSER_SUCCESS) {

        return {
            ...state,
            userLoading: false,
            user: action.payload.qUser,
        }
    }

    if (action.type === GET_CURRENT_USER_ERROR) {
        return {
            ...state,
            userLoading: false,
        };
    }

    if (action.type === GET_ADMIN_BEGIN) {
        return {
            ...state,
            isAdminLoading: true
        }
    }

    if (action.type === GET_ADMIN_SUCCESS) {
        return {
            ...state,
            isAdminLoading: false,
            admin: action.payload.user
        }
    }

    if (action.type === GET_ADMIN_ERROR) {
        return {
            ...state,
            isAdminLoading: false,
        };
    }

    if (action.type === UPLOAD_ITEM_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === UPLOAD_ITEM_SUCCESS) {
        return {
            ...state,
            isLoading: false,
        }
    }

    if (action.type === UPLOAD_ITEM_ERROR) {
        return {
            ...state,
            isLoading: false,
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            userLoading: false
        };
    }

    if (action.type === QLOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            userLoading: false
        };
    }

    if (action.type === GET_PRODUCT_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === GET_PRODUCT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            products: action.payload.products,
            totalProducts: action.payload.totalProducts,
            numofPages: action.payload.numofPages,
        };
    }

    if (action.type === GET_PRODUCT_ERROR) {
        return { ...state, isLoading: true, showAlert: false };
    }

    if (action.type === SAVED_PRODUCT_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === SAVED_PRODUCT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            savedItems: action.payload.savedItems
        };
    }

    if (action.type === SAVED_PRODUCT_ERROR) {
        return { ...state, isLoading: false };
    }

    if (action.type === PURCHASED_PRODUCT_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === PURCHASED_PRODUCT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            purchasedItems: action.payload.purchasedProduct
        };
    }

    if (action.type === PURCHASED_PRODUCT_ERROR) {
        return { ...state, isLoading: false };
    }

    if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            singleProduct: action.payload.singleproduct,
            categoryProducts: action.payload.productsInCategory,
        };
    }

    if (action.type === GET_SINGLE_PRODUCT_ERROR) {
        return { ...state, isLoading: false };
    }

    if (action.type === TOGGLE_THEME) {
        return {
            ...state,
            theme: action.payload.mode
        }
    }

    throw new Error(`no such action : ${action.type}`);
}

export default reducer;

