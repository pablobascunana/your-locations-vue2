import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'
import Vuex from 'vuex'

import application from '@/store/modules/application.js'

import LocationsTable from '@/components/LocationsTable.vue'

import * as historicalLocationsMock from '../mocks/historicalLocations.mock.js'

const localVue = createLocalVue();
localVue.use(Vuex);
let vuetify = new Vuetify();

describe('Locations Table', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        application
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(LocationsTable, {
            localVue,
            vuetify,
            store,
            mocks: {
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

    it('Call to add location function', () => {
        const addLocationFn = jest.spyOn(wrapper.vm, 'addLocation');
        wrapper.vm.addLocation();
        expect(addLocationFn).toBeCalled();
        expect(wrapper.vm.$store.state.application.addLocationDialogVisible).toBe(true);
    });

    it('Call to delete location function', () => {
        const deleteLocationFn = jest.spyOn(wrapper.vm, 'deleteLocation');
        wrapper.vm.deleteLocation(historicalLocationsMock.MARKER);
        expect(deleteLocationFn).toBeCalled();
        expect(wrapper.vm.markerToDelete).toStrictEqual(historicalLocationsMock.MARKER);
        expect(wrapper.vm.$store.state.application.removeLocationDialogVisible).toBe(true);
    });

    it('Call to update markers handler function', () => {
        const updateMarkersHandlerFn = jest.spyOn(wrapper.vm, 'updateMarkersHandler');
        wrapper.vm.updateMarkersHandler(historicalLocationsMock.MARKER);
        expect(updateMarkersHandlerFn).toBeCalled();
    });
});
