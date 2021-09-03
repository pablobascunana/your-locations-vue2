import { createLocalVue, shallowMount } from '@vue/test-utils'

import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import application from '@/store/modules/application.js'
import user from '@/store/modules/user.js'

import '@/mixins/formRules'
import Login from '@/views/Login.vue'

import * as loginMock from '../mocks/login.mock.js'

const Plugins = {
    install(Vue) {
      Vue.prototype.EventBus = new Vue();
    }
};

const localVue = createLocalVue();
localVue.use(Plugins);
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();
let vuetify = new Vuetify();


describe('Login', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        application,
        user
    };
    const mocks = {
        EventBus: {
            $on: jest.fn(),
            $off: jest.fn(),
            $emit: jest.fn(),
        },
        $t: () => {'some specific text in any language'}
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            router,
            store,
            data() {
                return {
                    user: {
                        userName: "test"
                    }
                }
            },
            mocks
        });
    });

    it("Should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Click in register button', async () => {
        const button = wrapper.find('#register');
        await button.trigger('click');
        expect(button.attributes().disabled).toBe(undefined);
    });

    it('Click in login button', async () => {
        const button = wrapper.find('#login');
        await button.trigger('click');
        expect(button.attributes().disabled).toBe(undefined);
    });

    it('Call to set store and go to historical locations function', () => {
        const setStoreAndGoToHistoricalLocationsFn = jest.spyOn(wrapper.vm, 'setStoreAndGoToHistoricalLocations');
        wrapper.vm.setStoreAndGoToHistoricalLocations(loginMock.LOGIN_RESPONSE);
        expect(setStoreAndGoToHistoricalLocationsFn).toBeCalled();
        expect(wrapper.vm.$store.state.application.accessToken).toBe(`${'Bearer '}${loginMock.LOGIN_RESPONSE.access_token}`);
        expect(wrapper.vm.$store.state.application.refreshToken).toBe(loginMock.LOGIN_RESPONSE.refresh_token);
        expect(wrapper.vm.$store.state.application.isLogin).toBe(false);
        expect(wrapper.vm.$store.state.user.userUuid).toBe(loginMock.USER_ID);
        expect(wrapper.vm.$store.state.user.userName).toBe(loginMock.USER_DATA.userName);
    });

    it('Call to check what error is function', () => {
        wrapper.vm.$refs.loginForm.validate = () => true;
        const checkWhatErrorIsFn = jest.spyOn(wrapper.vm, 'checkWhatErrorIs');
        wrapper.vm.checkWhatErrorIs(401);
        wrapper.vm.checkWhatErrorIs(404);
        wrapper.vm.checkWhatErrorIs(500);
        expect(checkWhatErrorIsFn).toBeCalled();
    });
});