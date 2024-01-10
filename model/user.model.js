const  mongoose  = require("mongoose");


const userSchema = new mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String
    },
    age:{
        type:String
    },
    sex:{
        type:String
    },
    image:[String],
    userType:{
        type: String,
        require: true,
        enum: ['admin','customer','seller'],
        default: 'customer',
    },
    petInStock:{
        type: [mongoose.SchemaType.ObjectId],
        ref: "pets"
    },
    oldorder:{
        type: [mongoose.SchemaType.ObjectId],
        ref: "pets"
    },
    newOrder:{
        type: [mongoose.SchemaType.ObjectId],
        ref: "pets"
    },
    orderToDelever:{
        type: [mongoose.SchemaType.ObjectId],
        ref: "pets"
    },
    likePet:{
        type: [mongoose.SchemaType.ObjectId],
        ref: "pets"
    },
    dislikePet:{
        type: [mongoose.SchemaType.ObjectId],
        ref: "pets"
    },
    commentPet:{
        type: [mongoose.SchemaType.ObjectId],
        ref: "pets"
    },
    wishLists:{
        type: [],
        
    }
})

module.exports = mongoose.model("USER", userSchema);