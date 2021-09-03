import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'
import Vuex from 'vuex'

import application from '@/store/modules/application.js'

import RemoveLocation from '@/components/dialogs/RemoveLocation.vue'

import * as historicalLocationsMock from '../../mocks/historicalLocations.mock.js'

const Plugins = {
    install(Vue) {
      Vue.prototype.EventBus = new Vue();
    }
};

const localVue = createLocalVue();
localVue.use(Plugins);
localVue.use(Vuex);
let vuetify = new Vuetify();

describe('RemoveLocation', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        application
    };
    const mocks = {
        EventBus: {
            $emit: jest.fn(),
        },
        $t: () => {'some specific text in any language'}
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(RemoveLocation, {
            localVue,
            vuetify,
            store,
            propsData: {
                marker: { type: Boolean, default: historicalLocationsMock.MARKER }
            },
            mocks
        });
    });

    it("should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });


    it('Call to delete location function', () => {
        const deleteLocationFn = jest.spyOn(wrapper.vm, 'deleteLocation');
        wrapper.vm.deleteLocation();
        expect(deleteLocationFn).toBeCalled();
    });

    it('Call to update markers and close dialog function', () => {
        const updateMarkersAndCloseDialogFn = jest.spyOn(wrapper.vm, 'updateMarkersAndCloseDialog');
        wrapper.vm.updateMarkersAndCloseDialog();
        expect(updateMarkersAndCloseDialogFn).toBeCalled();
    });

    it('Call to show error snackBar and close dialog function', () => {
        const showErrorSnackBarAndCloseDialogFn = jest.spyOn(wrapper.vm, 'showErrorSnackBarAndCloseDialog');
        wrapper.vm.showErrorSnackBarAndCloseDialog();
        expect(showErrorSnackBarAndCloseDialogFn).toBeCalled();
    });
    
    it('Call to close dialog function', () => {
        const closeDialogFn = jest.spyOn(wrapper.vm, 'closeDialog');
        wrapper.vm.closeDialog();
        expect(closeDialogFn).toBeCalled();
        expect(wrapper.vm.$store.state.application.addLocationDialogVisible).toBe(false);
    });
});