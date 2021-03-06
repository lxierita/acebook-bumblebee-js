// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('signup', (name, email, password) => {
	cy.visit('/new');
	cy.get('.signup #new-user').find('[name="username"]').type(name);
	cy.get('.signup #new-user').find('[name="email"]').type(email);
	cy.get('.signup #new-user').find('[name="password"]').type(password);
	cy.contains("Submit").click();
})

Cypress.Commands.add('signin', (username, password) => {
	cy.visit('/sign-in');
	cy.get('[name="username"]').type(username);
	cy.get('[name="password"]').type(password);
	cy.contains("submit").click();
});

beforeEach(function () {
	cy.task('resetDB');
})

afterEach(function() {
    cy.task('resetDB'); // runs after each test in the block
  })
// beforeEach(function(){
// 					cy.signup("Albatross", "123@gmail.com", "newpassword");
// 					cy.signin("Albatross", "newpassword");
// 					window.console.log('Enter the beforeEach function')
// 					// Preserve the cookies for all tests in this suite
// 					Cypress.Cookies.preserveOnce('name')
// 					cy.getCookies().then((cookies) => {
// 							window.console.log(cookies)
// 					})
// 			})
