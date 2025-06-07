Cypress.Commands.add("goToCreate", () => {
    cy.visit('/orphanages/create')
    cy.get('legend').should('be.visible').and('have.text', 'Cadastro')
});

Cypress.Commands.add("createOrphanage", (orphanage) => {
    cy.setMapPosition(orphanage.position)

     cy.get('#name').as('name')
/*     if (orphanage.name) { // Check if the name field is provided
        cy.get('@name').type(orphanage.name)
        //cy.get('@name').type(orphanage.name + ' ' + faker.company.name()) // Uncomment this line to use faker for random names
    } else {
        cy.log('Name field is not provided, skipping name input.')
    } */ //other way to use if condition

    orphanage.name ? cy.get('@name').type(orphanage.name) : cy.log('Name field is not provided, skipping name input.') // Check if the name field is provided
    orphanage.description ? cy.get('#description').type(orphanage.description) : cy.log('Description field is not provided, skipping description input.') // Check if the description field is provided
    orphanage.image ? cy.get('input[type="file"]').selectFile('./cypress/fixtures/images/' + orphanage.image, { force: true }) : cy.log('Image field is not provided, skipping image input.') // Check if the image field is provided
    orphanage.opening_hours ? cy.get('#opening_hours').type(orphanage.opening_hours) : cy.log('Opening hours field is not provided, skipping opening hours input.') // Check if the opening hours field is provided
    orphanage.open_on_weekends ? cy.contains('button', orphanage.open_on_weekends).click() : cy.log('Open on weekends field is not provided, skipping open on weekends input.') // Check if the open on weekends field is provided
    cy.get('.save-button').click()
});