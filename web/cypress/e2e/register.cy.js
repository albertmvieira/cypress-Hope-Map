import data from '../fixtures/orphanages.json'
import {generator} from '../support/factory'


describe('Cadastro de orfanatos', () => {

    it('deve cadastrar um novo orfanato', () => {

        const orphanage = data.create

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' }).then(result => {
            cy.log(result);
        }) // Limpa o banco de dados antes do teste

        cy.goToCreate() // Acessa a página de cadastro
        cy.createOrphanage(orphanage) // Realiza o cadastro do orfanato
        cy.popupHaveText('Orfanato cadastrado com sucesso.') // Verifica se o popup de sucesso é exibido
    });

    it('não deve cadastrar um orfanato quando o nome é duplicado', () => {
        const orphanage = data.duplicate

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' }).then(result => {
            cy.log(result);
        })

        cy.postOrphanage(orphanage) // Realiza o cadastro do orfanato via API
        cy.goToCreate() // Acessa a página de cadastro
        cy.createOrphanage(orphanage) // Tenta cadastrar novamente o orfanato com o mesmo nome
        cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)
    })

    context('Validações de campos obrigatórios', () => {

        it('não deve cadastrar se o campo nome não for preenchido', () => {
            let orphanage = data.required

            delete orphanage.name // Remove o campo nome do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Nome', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se o campo sobre não for preenchido', () => {
            let orphanage = data.required

            delete orphanage.description // Remove o campo descrição do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Sobre', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se imagem não for anexada', () => {
            let orphanage = data.required

            delete orphanage.image // Remove o campo imagem do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se o campo horario de funcionamento não for preenchido', () => {
            let orphanage = data.required

            delete orphanage.opening_hours // Remove o campo opening_hours do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Horário de funcinamento', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se campos obrigatórios não forem preenchidos', () => {
            let orphanage = data.required

            delete orphanage.name // Remove o campo nome do objeto para simular o erro
            delete orphanage.description // Remove o campo descrição do objeto para simular o erro
            delete orphanage.image // Remove o campo imagem do objeto para simular o erro
            delete orphanage.opening_hours // Remove o campo opening_hours do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Horário de funcinamento', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida
            cy.alertHaveText('Sobre', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida
            cy.alertHaveText('Nome', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto') // Verifica se a mensagem de erro é exibida

        })


    })

});

describe('Cadastro de orfanatos usando Factory test data', () => {

    before (() => {
        cy.dropCollection('orphanages') // Limpa a coleção de orfanatos antes de iniciar os testes
    })

    it('deve cadastrar um novo orfanato', () => {

        const orphanage = generator()

        cy.goToCreate() // Acessa a página de cadastro
        cy.createOrphanage(orphanage) // Realiza o cadastro do orfanato
        cy.popupHaveText('Orfanato cadastrado com sucesso.') // Verifica se o popup de sucesso é exibido
    });

    it('não deve cadastrar um orfanato quando o nome é duplicado', () => {
        const orphanage = generator()


        cy.postOrphanage(orphanage) // Realiza o cadastro do orfanato via API
        cy.goToCreate() // Acessa a página de cadastro
        cy.createOrphanage(orphanage) // Tenta cadastrar novamente o orfanato com o mesmo nome
        cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)
    })

    context('Validações de campos obrigatórios', () => {

        it('não deve cadastrar se o campo nome não for preenchido', () => {
            let orphanage = generator()

            delete orphanage.name // Remove o campo nome do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Nome', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se o campo sobre não for preenchido', () => {
            let orphanage = generator()

            delete orphanage.description // Remove o campo descrição do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Sobre', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se imagem não for anexada', () => {
            let orphanage = generator()

            delete orphanage.image // Remove o campo imagem do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se o campo horario de funcionamento não for preenchido', () => {
            let orphanage = generator()

            delete orphanage.opening_hours // Remove o campo opening_hours do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Horário de funcinamento', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida

        })

        it('não deve cadastrar se campos obrigatórios não forem preenchidos', () => {
            let orphanage = generator()

            delete orphanage.name // Remove o campo nome do objeto para simular o erro
            delete orphanage.description // Remove o campo descrição do objeto para simular o erro
            delete orphanage.image // Remove o campo imagem do objeto para simular o erro
            delete orphanage.opening_hours // Remove o campo opening_hours do objeto para simular o erro

            cy.goToCreate() // Acessa a página de cadastro
            cy.createOrphanage(orphanage) // Tenta cadastrar o orfanato sem preencher o campo nome

            cy.alertHaveText('Horário de funcinamento', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida
            cy.alertHaveText('Sobre', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida
            cy.alertHaveText('Nome', 'Campo obrigatório') // Verifica se a mensagem de erro é exibida
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto') // Verifica se a mensagem de erro é exibida

        })


    })

});