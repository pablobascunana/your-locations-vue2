import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'

import SnackBar from '@/components/wrappers/SnackBar.vue'

const localVue = createLocalVue();
let vuetify = new Vuetify();


describe('App', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(SnackBar, {
            localVue,
            vuetify,
        });
    });

    it("should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Call to close snackBar function', () => {
        const closeSnackBarFn = jest.spyOn(wrapper.vm, 'closeSnackBar');
        jest.useFakeTimers();
        wrapper.vm.closeSnackBar();
        jest.advanceTimersByTime(8000);
        expect(closeSnackBarFn).toBeCalled();
        expect(wrapper.vm.showSnackBar).toBe(false);
    });
});