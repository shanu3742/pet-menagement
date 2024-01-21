const mongoose = require('mongoose');
  


const petSchema = new mongoose.Schema({
    paymentsOptions:{
        type:Array,
    },
})
module.exports = mongoose.model("PAYMENT-GETWAYS", petSchema);