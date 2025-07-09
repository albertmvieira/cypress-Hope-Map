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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('zipfind', (adress, mock = false) => {
    if (mock) {
        cy.intercept('GET', '/zipcode/*', {
            statusCode: 200,
            body: {
                cep: adress.zipcode,
                logradouro: adress.street,
                cidade_uf: adress.city,
                bairro: adress.district,
            }
        }).as('getZipCode')
    }

    
    cy.get('[data-cy=inputCep]').type(adress.zipcode)
    cy.get('[data-cy=submitCep]').click()

    if (mock) {
        cy.wait('@getZipCode')
    }
})