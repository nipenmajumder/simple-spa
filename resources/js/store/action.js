export const LOGIN = "LOGIN";
export const UPDATE_USER = "UPDATE_USER";
import {SET_USER, SET_USER_DATA, } from './mutations';
import {setToken} from '../helpers/auth'

export default {
    [LOGIN]({ commit }, data) {
        // console.log(data);
        setToken(data.token);
        commit(SET_USER, data);
    },
    [UPDATE_USER]({ commit }, data) {
        commit(SET_USER_DATA, data);
    },

}
