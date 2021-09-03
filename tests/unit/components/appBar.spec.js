import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'
import Vuex from 'vuex'

import application from '@/store/modules/application.js'
import user from '@/store/modules/user.js'

import AppBar from '@/components/AppBar.vue'


const localVue = createLocalVue();
localVue.use(Vuex);
let vuetify = new Vuetify();


describe('AppBar', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        application,
        user
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(AppBar, {
            localVue,
            vuetify,
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
        expect(wrapper.vm.$store.state.application.logoutDialogVisible).toBe(true);
    });
});