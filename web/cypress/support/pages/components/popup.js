class Popup{

    haveText(text) {
        cy.get('div .swal2-html-container').should('have.text', text).should('be.visible');
        cy.get('.swal2-confirm').click()
    }
}

export default new Popup();