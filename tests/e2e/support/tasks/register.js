const register = require('../constants/register');

Cypress.Commands.add("fillRegisterForm", (user) => {
    cy.get(register.INPUT_USER_USERNAME).clear().type(user.userName);
    cy.get(register.INPUT_USER_NAME).clear().type(user.name);
    cy.get(register.INPUT_USER_LAST_NAME).clear().type(user.lastName);
    cy.get(register.INPUT_USER_EMAIL).clear().type(user.email);
    cy.get(register.INPUT_USER_PASSWORD).clear().type(user.password);
    cy.get(register.INPUT_USER_REPEAT_PASSWORD).clear().type(user.repeteadPassword);
    cy.get(register.BUTTON_REGISTER).click();
    cy.wait(500);
});