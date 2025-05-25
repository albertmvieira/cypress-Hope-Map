import data from '../fixtures/orphanages.json'

describe('Mapa', () => {

    it('deve poder escolher um orfanato no mapa', () => {

        const orphanage = data.map
        
        // Deletar o orfanato caso já exista
        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' }).then(result => {
            cy.log(result);
        })

        cy.postOrphanage(orphanage) // Realiza o cadastro do orfanato via API
        cy.visit('http://localhost:3000/map')

        cy.get('.leaflet-marker-icon').as('mapList')
        cy.get('@mapList').each((element, index, list) => {
            cy.get('@mapList').eq(index).click({ force: true })
            cy.wait(1000)
            cy.get('.leaflet-popup-content').as('divName')
            cy.get('@divName').invoke('text').then((text) => {
                cy.log(text)
                if (text === orphanage.name) {
                    cy.get('@mapList').eq(index).as('foundItem')
                    cy.log('Orfanato encontrado: ' + orphanage.name)
                }
            })
        })
        cy.get('@foundItem').click({ force: true })
        cy.contains('.leaflet-popup-content', orphanage.name).find('a').click({ force: true })
        cy.contains('h1', orphanage.name).should('be.visible')
    })
})