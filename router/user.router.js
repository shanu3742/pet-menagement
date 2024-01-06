const { postDetails, getUserDetails } = require("../controller/user.controller")

module.exports = (app) => {
    app.post('/petApp/api/v1/userDetails',postDetails)
    app.get('/petApp/api/v1/user/:userId',getUserDetails)
}