const mongoose = require('mongoose');
  


const orderSchema = new mongoose.Schema({
    transitionId:String,
    transtitionTime:String,
    transitionBy:Object,
    orderDetails:Object
})
module.exports = mongoose.model("ORDER", orderSchema);