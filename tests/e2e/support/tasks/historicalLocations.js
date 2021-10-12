const historicalLocations = require('../constants/historicalLocations');

Cypress.Commands.add("checkEmptyTable", () => {
  cy.get(historicalLocations.TABLE_TITLE).should('have.text', 'Tus localizaciones');
  cy.get(historicalLocations.TABLE_HEADER).contains(historicalLocations.TABLE_TH, 'Localización');
  cy.get(historicalLocations.TABLE_HEADER).contains(historicalLocations.TABLE_TH, 'Latitud');
  cy.get(historicalLocations.TABLE_HEADER).contains(historicalLocations.TABLE_TH, 'Longitud');
  cy.get(historicalLocations.TABLE_HEADER).contains(historicalLocations.TABLE_TH, 'Fecha');
  cy.get(historicalLocations.TABLE_HEADER).contains(historicalLocations.TABLE_TH, 'Acciones');
  cy.get(historicalLocations.TABLE_EMPTY_MESSAGE).should('have.text', 'No hay datos disponibles');
});

Cypress.Commands.add("addLocation", () => {
  cy.get(historicalLocations.BUTTON_SHOW_ADD_LOCATION).click({ force: true });
  cy.get(historicalLocations.BUTTON_CLOSE_DIALOG).click();
  cy.get(historicalLocations.BUTTON_SHOW_ADD_LOCATION).click();
  cy.get(historicalLocations.INPUT_SEARCH_LOCATION).type('Cuenca');
  cy.get(historicalLocations.AUTOCOMPLETE).click({ multiple: true, force: true });
  cy.get(historicalLocations.BUTTON_ADD_LOCATION).click();
  cy.get(historicalLocations.BUTTON_EXIT_DIALOG).click();
});

Cypress.Commands.add("checkFilledTable", () => {
  cy.get(historicalLocations.TABLE_FILLED).contains(historicalLocations.TABLE_TD, 'Cuenca');
  cy.get(historicalLocations.TABLE_FILLED).contains(historicalLocations.TABLE_TD, '40.0703925');
  cy.get(historicalLocations.TABLE_FILLED).contains(historicalLocations.TABLE_TD, '-2.1374162');
  cy.get(historicalLocations.TABLE_FILLED).contains(historicalLocations.TABLE_TD, new Date().getFullYear());
});

Cypress.Commands.add("removeLocation", () => {
  cy.get(historicalLocations.BUTTON_DELETE_LOCATION).click();
  cy.get(historicalLocations.BUTTON_CLOSE_DIALOG).click({ force: true });
  cy.get(historicalLocations.BUTTON_DELETE_LOCATION).click({ force: true });
  cy.get(historicalLocations.BUTTON_REMOVE_LOCATION).click({ force: true });
});

Cypress.Commands.add("logout", () => {
  cy.get(historicalLocations.BUTTON_APPBAR_LOGOUT).click();
  cy.get(historicalLocations.BUTTON_DIALOG_LOGOUT).click({force: true});
});