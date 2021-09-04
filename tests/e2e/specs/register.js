const login = require('../support/constants/login');
const register = require('../support/constants/register');

describe('Register Test', () => {

  it('Check button navigation', () => {
    cy.visit(register.ROUTE_REGISTER);
    cy.wait(500);
    cy.get(cy.get(register.BUTTON_BACK_TO_LOGIN).click());
    cy.wait(500);
    cy.get(cy.get(login.BUTTON_GO_TO_REGISTER).click());
    cy.wait(500);
  });

  it('Check if register button is disabled', () => {
    expect(cy.get(register.BUTTON_REGISTER).should('be.disabled'));
  });

  it('Do register', () => {
    cy.intercept(register.URL_REGISTER, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body.userName).to.equal("test");
        expect(response.body.name).to.equal("Pepe");
        expect(response.body.lastName).to.equal("Lopez Martínez");
        expect(response.body.email).to.equal("unemail@unemail.com");
      });
    });
    cy.fixture(register.FIXTURE_REGISTER_USER_DATA).then((register) => {
      cy.fillRegisterForm(register.user);
    }); 
  });

  it('Do register with existing username', () => {
    cy.visit('/register');
    cy.intercept(register.URL_REGISTER, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).contains("userName");
      });
    });
    cy.fixture(register.FIXTURE_REGISTER_USER_DATA).then((register) => {
      cy.fillRegisterForm(register.user);
    }); 
  });

  it('Do register with existing email', () => {
    cy.intercept(register.URL_REGISTER, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).contains("email");
      });
    });
    cy.fixture(register.FIXTURE_REGISTER_USER_DATA).then((register) => {
      register.user.userName = "test2";
      cy.fillRegisterForm(register.user);
    }); 
  });

  it('Go to login', () => {
    cy.visit(login.ROUTE_LOGIN);
  });
});
