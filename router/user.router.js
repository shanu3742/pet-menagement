const { getPet } = require("../controller/pet.controller");
const { postDetails, getUserDetails, addPetToWishList, getPetList, deletePetList, updateUser } = require("../controller/user.controller")

module.exports = (app) => {
    app.post('/petApp/api/v1/userDetails',postDetails)
    app.post('/petApp/api/v1/userDetails/userUpdate/:userId',updateUser)
    app.get('/petApp/api/v1/user/:userId',getUserDetails)
    app.post('/petApp/api/v1/user/wishlist/:userId',addPetToWishList);
    app.get('/petApp/api/v1/user/wishlist/:userId',getPetList)
    app.get('/petApp/api/v1/user/wishlist/:userId/:petId',deletePetList)
    
}