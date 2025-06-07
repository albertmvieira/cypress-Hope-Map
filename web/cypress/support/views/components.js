Cypress.Commands.add('popupHaveText', (text) => {
    cy.get('div .swal2-html-container').should('have.text', text).should('be.visible');
    cy.get('.swal2-confirm').click();
})

Cypress.Commands.add('alertHaveText', (label, text) => {
    cy.contains('label', label)
        .parent()
        .find('small')
        .should('be.visible') // Verifica se a mensagem de erro é exibida
        .and('have.text', text) // Verifica se o texto da mensagem de erro está correto
})

Cypress.Commands.add('googleMapLink', (position) => {
    const googleurl = `https://www.google.com/maps/dir/?api=1&destination=${position.latitude},${position.longitude}`
    cy.contains('a', 'Ver rotas no Google Maps').should('have.attr', 'href', googleurl) // Verifica se o link de rotas está correto
})