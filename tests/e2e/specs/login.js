const login = require('../support/constants/login');

describe('Register Test', () => {

  it('Do incorrect username login', () => {
    cy.visit(login.ROUTE_LOGIN);
    cy.intercept(login.URL_LOGIN, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(404);
        expect(response.body).contains("does not exist");
      });
    });
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      user.userName = "test2";
      cy.fillLoginForm(user);
    }); 
  });

  it('Do incorrect password login', () => {
    cy.intercept(login.URL_LOGIN, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(401);
        debugger
        expect(response.body.message).contains("Bad credentials");
      });
    });
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      user.password = "superSecret2";
      cy.fillLoginForm(user);
    }); 
  });

  it('Do login', () => {
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

  it('Check AppBar title', () => {
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      cy.checkAppBarTitle(user);
    }); 
  });

  it('Logout', () => {
    cy.logout();
  })
});
