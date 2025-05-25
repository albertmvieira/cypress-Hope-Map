Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude)
    window.localStorage.setItem('hope-qa:longitude', position.longitude);
})

Cypress.Commands.add('postOrphanage', (orphanage) => {

    cy.fixture('images/' + orphanage.image, 'binary')
        .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/png'))
        .then((blob) => {

            const formData = new FormData();

            formData.append('name', orphanage.name);
            formData.append('latitude', orphanage.position.latitude);
            formData.append('longitude', orphanage.position.longitude);
            formData.append('description', orphanage.description);
            formData.append('opening_hours', orphanage.visiting_hours);
            formData.append('open_on_weekends', orphanage.open_on_weekends ? 'true' : 'false');
            formData.append('images', blob, orphanage.image);


            cy.request({
                method: 'POST',
                url: 'http://localhost:3333/orphanages',
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