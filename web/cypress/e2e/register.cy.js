import data from '../fixtures/orphanages.json'
import { faker } from '@faker-js/faker'
import registerPage from '../support/pages/register'


describe('Cadastro de orfanatos', () => {

    it('deve cadastrar um novo orfanato', () => {

        const orphanage = data.create

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' }).then(result => {
            cy.log(result);
        })

        registerPage.go()
        cy.setMapPosition(orphanage.position)
        registerPage.form(orphanage)
        registerPage.submit()
        registerPage.popup.haveText('Orfanato cadastrado com sucesso.')
    });

    it('não deve cadastrar um orfanato quando o nome é duplicado', () => {
        const orphanage = data.duplicate

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' }).then(result => {
            cy.log(result);
        })

        cy.postOrphanage(orphanage) // Realiza o cadastro do orfanato via API
        registerPage.go()
        cy.setMapPosition(orphanage.position)
        registerPage.form(orphanage)
        registerPage.submit()
        registerPage.popup.haveText('Já existe um cadastro com o nome: ' + orphanage.name)
    })

});