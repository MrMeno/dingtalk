import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import Cookies from 'js-cookie';

Vue.use(Vuex)
export function createStore() {
    return new Vuex.Store({
        state: {
            router:'',
            showList:[],
            fileList:[],
            hasFront:false
        },
        mutations,
        getters
    })
}