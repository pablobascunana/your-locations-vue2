const login = require('../support/constants/login');
const historicalLocations = require('../support/constants/historicalLocations');

describe('Register Test', () => {

  it('Do login', () => {
    cy.visit(login.ROUTE_LOGIN);
    cy.intercept(login.URL_LOGIN, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.access_token).contains("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9");
        expect(response.body.refresh_token).contains("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9");
      });
    });
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      cy.fillLoginForm(user);
    }); 
  });

  it('Check the complete empty table', () => {
    cy.checkEmptyTable();
  });

  it('Add location', () => {
    cy.addLocation();
  });

  it('Check location added', () => {
    cy.checkFilledTable();
  });

  it('Remove location', () => {
    cy.removeLocation();
  });

  it('Logout', () => {
    cy.logout();
  })
});
