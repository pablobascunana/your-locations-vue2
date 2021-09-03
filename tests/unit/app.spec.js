import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'
import Vuex from 'vuex'

import application from '@/store/modules/application.js'

import App from '@/App.vue'

import * as appMock from './mocks/app.mock.js'

const Plugins = {
    install(Vue) {
      Vue.prototype.EventBus = new Vue();
    }
};

const localVue = createLocalVue();
localVue.use(Plugins);
localVue.use(Vuex);
let vuetify = new Vuetify();


describe('App', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        application
    };
    const mocks = {
        EventBus: {
            $on: jest.fn()
        },
        $t: () => {'some specific text in any language'}
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(App, {
            localVue,
            vuetify,
            store,
            mocks
        });
    });

    it("Should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Renders AppBar component', () => {
        wrapper.vm.$store.commit('application/isLogin', false);
    });

    it('Call to fill and show snackBar', () => {
        const fillAndShowSnackBar = jest.spyOn(wrapper.vm, 'fillAndShowSnackBar');
        wrapper.vm.fillAndShowSnackBar(appMock.SUCCESS_SNACK_BAR);
        wrapper.vm.fillAndShowSnackBar(appMock.ERROR_SNACK_BAR);
        expect(fillAndShowSnackBar).toBeCalled();
    });

    it('Call to snackBar handler', () => {
        const snackBarHandlerFn = jest.spyOn(wrapper.vm, 'snackBarHandler');
        wrapper.vm.snackBarHandler();
        expect(snackBarHandlerFn).toBeCalled();
        expect(wrapper.vm.showSnackBar).toBe(false);
    });
});