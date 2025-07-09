import data from '../fixtures/orphanages.json'

describe('Mapa', () => {

    it('deve poder escolher um orfanato no mapa', () => {

        const orphanage = data.map
        
        // Deletar o orfanato caso já exista
        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' }).then(result => {
            cy.log(result);
        })

        cy.postOrphanage(orphanage) // Realiza o cadastro do orfanato via API

        cy.openOrphanage(orphanage.name) // Abre o mapa e clica no orfanato

        cy.contains('h1', orphanage.name).should('be.visible') // Verifica se o nome do orfanato está visível na tela

        cy.googleMapLink(orphanage.position) // Verifica se o link do Google Maps está correto
    })
})