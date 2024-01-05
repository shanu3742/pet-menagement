const { getPet, postPet } = require("../controller/pet.controller")

module.exports = (app) => {

    app.get('/petApp/api/v1/pet',getPet);
    app.post('/petApp/api/v1/pet',postPet)
    
}