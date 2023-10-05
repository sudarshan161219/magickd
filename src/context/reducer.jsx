import { TOGGLE_MENU, TOGGLE_SEARCH } from "./action"

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

    throw new Error(`no such action : ${action.type}`);
}

export default reducer;