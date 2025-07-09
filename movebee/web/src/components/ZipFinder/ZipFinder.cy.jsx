import React from 'react'
import ZipFinder from './ZipFinder'

describe('<ZipFinder />', () => {

  beforeEach(() => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ZipFinder />)

    cy.viewport(1280, 768)

    //elementos do componente
    cy.get('[data-cy=inputCep]').as('inputCep')
    cy.get('[data-cy=submitCep]').as('submitCep')

  });

  it('deve buscar um cep na area de cobertura', () => {

    const adress = {
      street: 'Rua Joaquim Floriano',
      district: 'Itaim Bibi',
      city: 'São Paulo/SP',
      zipcode: '04534-011',
    }

    cy.zipfind(adress, true)

    cy.get('[data-cy=street]').should('have.text', adress.street)
    cy.get('[data-cy=district]').should('have.text', adress.district)
    cy.get('[data-cy=city]').should('have.text', adress.city)
    cy.get('[data-cy=zipcode]').should('have.text', adress.zipcode)


  })

  it('cep deve ser obrigatório', () => {

    cy.get('@submitCep').click()
    cy.get('#swal2-title').should('contain', 'Preencha algum CEP')
    cy.get('.swal2-confirm').click()

  })

  it('cep inválido', () => {

    const adress = {zipcode: '0000000'}
    cy.zipfind(adress)
    
    cy.get('[data-cy="notice"]').should('be.visible').should('have.text', 'CEP no formato inválido.')

  })

  it('cep fora da area de cobertura', () => {

    const zipcode = '00000-000'
    cy.get('@inputCep').type(zipcode)
    cy.get('@submitCep').click()
    cy.get('[data-cy="notice"]').should('be.visible').should('have.text', 'No momento não atendemos essa região.')

  })
})