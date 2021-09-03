import { createLocalVue, shallowMount } from '@vue/test-utils'

import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import application from '@/store/modules/application.js'

import Logout from '@/components/dialogs/Logout.vue'

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();
let vuetify = new Vuetify();

describe('Logout', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        application
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(Logout, {
            localVue,
            vuetify,
            router,
            store,
            mocks: {
                $t: () => {'some specific text in any language'}
            }
        });
    });

    it("Should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Call to logout function', () => {
        const logoutFn = jest.spyOn(wrapper.vm, 'logout');
        wrapper.vm.logout();
        expect(logoutFn).toBeCalled();
        expect(wrapper.vm.$store.state.application.isLogin).toBe(true);
        expect(wrapper.vm.$store.state.application.addLocationDialogVisible).toBe(false);
    });
});