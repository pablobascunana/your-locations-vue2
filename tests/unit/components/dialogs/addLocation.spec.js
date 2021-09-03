import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'
import Vuex from 'vuex'

import application from '@/store/modules/application.js'

import AddLocation from '@/components/dialogs/AddLocation.vue'

const localVue = createLocalVue();
localVue.use(Vuex);
let vuetify = new Vuetify();

describe('AddLocation', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        application
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(AddLocation, {
            localVue,
            vuetify,
            store,
            mocks: {
                $t: () => {'some specific text in any language'}
            }
        });
    });

    it("should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Call to close dialog function', () => {
        const closeDialogFn = jest.spyOn(wrapper.vm, 'closeDialog');
        wrapper.vm.closeDialog();
        expect(closeDialogFn).toBeCalled();
        expect(wrapper.vm.$store.state.application.addLocationDialogVisible).toBe(false);
    });
});