Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude)
    window.localStorage.setItem('hope-qa:longitude', position.longitude);
})

Cypress.Commands.add('postOrphanage', (orphanage) => { // Comando para cadastrar um orfanato via API

    cy.fixture('images/' + orphanage.image, 'binary') // Lê a imagem do fixture como binário
        .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/png')) // Converte a imagem para Blob
        .then((blob) => { // Cria um FormData para enviar os dados do orfanato

            const formData = new FormData(); // Cria um novo FormData

            formData.append('name', orphanage.name);
            formData.append('latitude', orphanage.position.latitude);
            formData.append('longitude', orphanage.position.longitude);
            formData.append('description', orphanage.description);
            formData.append('opening_hours', orphanage.opening_hours);
            formData.append('open_on_weekends', orphanage.open_on_weekends ? 'true' : 'false');
            formData.append('images', blob, orphanage.image); // Adiciona a imagem ao FormData


            cy.request({
                method: 'POST',
                url: Cypress.env('baseAPIUrl') + '/orphanages',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
                encoding: 'binary', // Necessário para enviar o corpo corretamente
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })
})