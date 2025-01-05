const mongoose = require('mongoose');
  


const petSchema = new mongoose.Schema({
    productId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'PET',
        required:true,
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required:true,
    },
   
    paymentStatus:{
        type:String,
        enum:['pending','success','failure'],
        default:()=>{
            return 'pending'
        }
    },
    transitionId:{
        type:String,

    },
    productName:{
        type:String,
        required:true,
    },
    productDescription:{
        type:String,
       
    },
    productImage:{
        type:[String],
        
    },
    amount:{
        type:String,
       
    },
    
    createdAt: {
        type: Date,
        default: () => {
          return Date.now();
        },
        immutable: true,
    },
    updateAt: {
        type: Date,
        default: () => {
          return Date.now();
        },
    }

})
module.exports = mongoose.model("PAYMENT", petSchema);