import {defineStore} from 'pinia'


const store = defineStore({
    state: () => {
        return {user: {}}
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {

    },
})

export default store;
