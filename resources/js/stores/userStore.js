import {defineStore} from 'pinia'
import {removeToken, setToken} from '../helpers/auth'

export const useAuthUser = defineStore('authUser', {
    state: () => {
        return {
            user: {},
            token: null,
        }
    },
    // action,
    actions: {
        logIn(data) {
            this.setUser(data);
            this.setUserToken(data.token);
            setToken(data.token);
        },
        setUser(data) {
            this.user = {...data};
        },
        setUserToken(token) {
            this.token = token;
        },
        logOut() {
            this.user = {};
            this.token = null;
            removeToken();

        }
    },
    // getters: {
    //     getUser: (state) => {
    //         return state.user;
    //     },
    //     getToken: (state) => {
    //         return state.token;
    //     }
    // },
});
