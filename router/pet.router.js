const { getPet, postPet ,getPetById, petSearch, } = require("../controller/pet.controller")

module.exports = (app) => {

    app.get('/petApp/api/v1/pet',getPet);
    app.post('/petApp/api/v1/pet',postPet);
    app.get("/petApp/api/v1/pet/search",petSearch)
    app.get("/petApp/api/v1/pet/:petNumber", getPetById);
    
}