import {defineStore} from 'pinia'
import {setToken} from '../helpers/auth'

export const authUser = defineStore('auth', {
    state: () => {
        return {
            user: {},
            token: null,
        }
    },
    // action,
    actions: {
        async logIn(data) {
            setToken(data.token);
            this.setUser(data);
            this.setUserToken(data.token);
        },
        setUser(data) {
            this.user = {...data};
        },
        setUserToken(token) {
            this.token = token;
        },

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
