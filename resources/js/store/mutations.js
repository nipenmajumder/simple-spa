
export const SET_USER = "SET_USER";
export const SET_USER_DATA = "SET_USER_DATA";

export default {
    [SET_USER](state, data) {
        state.user = data
    },
    [SET_USER_DATA](state, data) {
        state.user = {
            ...state.user,
            ...data
        }
    },
}
