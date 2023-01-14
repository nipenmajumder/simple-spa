import {defineStore} from 'pinia'
import {setToken} from '../helpers/auth'
import action from "./action";
import mutations from "./mutations";

export const authUser = defineStore('auth', {
    state: () => {
        return {
            user: null
        }
    },
    action,
    mutations,
});
