import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'

import LocationsMap from '@/components/LocationsMap.vue'

const Plugins = {
    install(Vue) {
      Vue.prototype.EventBus = new Vue();
    }
};

const localVue = createLocalVue();
localVue.use(Plugins);
let vuetify = new Vuetify();

// https://salesforce.stackexchange.com/questions/261538/how-to-mock-navigator-geolocation-in-a-lwc
const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementation((success) => 
        Promise.resolve(
            success({
                coords: {
                    latitude: 10,
                    longitude: 10
                }
            })
        )
    )
};

navigator.geolocation = mockGeolocation;

describe('Locations Map', () => {
    let wrapper;
    const mocks = {
        EventBus: {
            $emit: jest.fn(),
        },
        $t: () => {'some specific text in any language'}
    };
    beforeEach(() => {
        wrapper = shallowMount(LocationsMap, {
            localVue,
            vuetify,
            mocks
        });
    });

    it("Should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Call to set place function', () => {
        const setPlaceFn = jest.spyOn(wrapper.vm, 'setPlace');
        wrapper.vm.setPlace({ geometry: { location: { lat: () => 10, lng: () => 10 } } });
        expect(setPlaceFn).toBeCalled();
        expect(wrapper.vm.currentPlace).not.toBe(null);
    });

    it('Call to add marker function', () => {
        wrapper.vm.currentPlace = { geometry: { location: { lat: () => 10, lng: () => 10 } } };
        const addMarkerFn = jest.spyOn(wrapper.vm, 'addMarker');
        wrapper.vm.addMarker();
        expect(addMarkerFn).toBeCalled();
        expect(wrapper.vm.center).toStrictEqual({ lat: 10, lng: 10 });
        expect(wrapper.vm.currentPlace).toBe(null);
    });

    // TODO review at is not a function problem here
    // it('Call to show success snackBar and add marker function', () => {
    //     const showSuccessSnackBarAndAddMarkerFn = jest.spyOn(wrapper.vm, 'showSuccessSnackBarAndAddMarker');
    //     wrapper.vm.showSuccessSnackBarAndAddMarker(historicalLocationsMock.MARKER);
    //     expect(showSuccessSnackBarAndAddMarkerFn).toBeCalled();
    // });

    it('Call to show error snack bar function', () => {
        const showErrorSnackBarFn = jest.spyOn(wrapper.vm, 'showErrorSnackBar');
        wrapper.vm.showErrorSnackBar();
        expect(showErrorSnackBarFn).toBeCalled();
    });
});