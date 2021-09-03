import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import '@/mixins/formRules'
import Register from '@/views/Register.vue'

import * as registerMock from '../mocks/register.mock.js'

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
let vuetify = new Vuetify();

describe('Register', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Register, {
            localVue,
            vuetify,
            router,
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

    it('Click in back button', async () => {
        const button = wrapper.find('#back');
        await button.trigger('click');
        expect(button.attributes().disabled).toBe(undefined);
    });

    it('Register button has disabled property', async () => { 
        const button = wrapper.find('#register');
        await button.trigger('click');
        expect(button.attributes().disabled).toBe('true');
    });

    it('Call watch', () => {
        wrapper.vm.user = registerMock.USER_DATA;
        wrapper.vm.$refs.registerForm.resetValidation = () => true;
    });

    it('Call to check error function', () => {
        const checkErrorFn = jest.spyOn(wrapper.vm, 'checkError');
        expect(wrapper.vm.checkError('userName')).toContain(wrapper.vm.user.userName);
        expect(wrapper.vm.checkError('email')).toContain(wrapper.vm.user.email);
        expect(wrapper.vm.checkError('something')).toContain(wrapper.vm.user.userName);
        expect(checkErrorFn).toBeCalled();
    });
});