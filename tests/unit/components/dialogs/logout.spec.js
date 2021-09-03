import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'
import Vuex from 'vuex'

import store from '@/store/index.js'
import router from '@/router/index.js'

import Logout from '@/components/dialogs/Logout.vue'

const localVue = createLocalVue();
localVue.use(Vuex);
let vuetify = new Vuetify();

describe('Logout', () => {
    let wrapper;
    beforeEach(() => {

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
        wrapper.vm.$store.commit('resetStore');
        expect(wrapper.vm.$store.state.application.isLogin).toBe(true);
        expect(wrapper.vm.$store.state.application.addLocationDialogVisible).toBe(false);
    });
});