const login = require('../constants/login');

Cypress.Commands.add("fillLoginForm", (user) => {
    cy.get(login.INPUT_USER_USERNAME).clear().type(user.userName);
    cy.get(login.INPUT_USER_PASSWORD).clear().type(user.password);
    cy.get(login.BUTTON_LOGIN).click();
    cy.wait(500);
});

Cypress.Commands.add("checkAppBarTitle", (user) => {
    cy.get(login.APP_BAR_TITLE).should('have.text', `Bienvenido ${user.userName}`);
});

Cypress.Commands.add("logout", () => {
    cy.get(login.BUTTON_LOGOUT).click();
    cy.get(login.BUTTON_CLOSE_DIALOG).click();
    cy.get(login.BUTTON_LOGOUT).click();
    cy.get(login.BUTTON_LOGOUT_DIALOG).click({force: true});
});