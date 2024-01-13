const mongoose = require('mongoose');
  


const petSchema = new mongoose.Schema({
    animaltype:{
        type:String,
    },
    sex:{
     type:String
    },
    age:{
      type:String
    },
    weight:{
        type:String
    },
    id:{
       type:String
    },
    name:{
        type:String,
        minLength: 3
    },
    description:{
        type:String,
       
    },
    like:{
        type:Number
    },
    dislike:{
       type:Number
    },
    shortdescription:{
        type:String,
        
    },
    price:{ 
        type:String
    },
    location:{
        type:String
    },
    longitude:{
        type:String
    },
    lattitude:{
        type:String
    },
    createdBy:{
        type:String
    },
    owner:{
        type: Object,
    },
    image:[String],
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
    },


})
module.exports = mongoose.model("PET", petSchema);