import popup from "../components/popup"

class RegisterPage {

    constructor() {
        this.popup = popup;
    }

    go() {
        cy.visit('http://localhost:3000/orphanages/create')   
        cy.get('legend').should('be.visible').and('have.text', 'Cadastro')
    }

    form(orphanage){
        cy.get('#name').type(orphanage.name)
        //cy.get('#name').type(orphanage.name + ' ' + faker.company.name())
        cy.get('#description').type(orphanage.description)
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/images/' + orphanage.image, { force: true })
        cy.get('#opening_hours').type(orphanage.visiting_hours)
        cy.contains('button', orphanage.open_on_weekends).click()
    }

    submit(){
        cy.get('.save-button').click()
    }

}

export default new RegisterPage();