const USER = require('../model/user.model')
const PET = require('../model/pet.model')
exports.postDetails = async (req,res) => {

try{
    let reqResponse = req?.body;
    let id= reqResponse?.id;
     if(!id){

        return res.status(400).send({
            message:"please provide a unique id and it's not be undefined"
        })

     }

     /**
      * let check id is alerady present
      */

     let user  = await USER.findOne({ id: id});
     if(user){
        return res.status(409).send({
            message:"User Allready Exits"
        })
     }

     const postUser= {
        id:reqResponse?.id,
        name:reqResponse?.name,
        age:reqResponse?.age,
        sex:reqResponse?.sex,
        image:[...reqResponse?.image]
     }

     const createdUser = await USER.create(postUser);
     res.status(201).send(createdUser)

}catch(e){
    res.status(500).send({
        message: `internal server error ${e}`,
      })
}

}

exports.getUserDetails = async  (req,res) => {
 
    try{
        let id= req.params?.userId;
        if(!id){
            return res.status(400).send({
                message:"please provide a unique id and it's not be undefined"
            })
        }
        let user= await USER.findOne({ id: id});
        if(!user){
            return  res.status(404).send({
                   message: `user Not Found  For The Given Id`,
                 })
           }

           res.status(200).send(user)

    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          }) 
    }
}

exports.addPetToWishList = async (req,res) => {
    try{
        let id= req.params?.userId;
        let petId= req.body._id
        if(!id){
            return res.status(400).send({
                message:"please provide a unique id and it's not be undefined"
            })
        }
        let user= await USER.findOne({ id: id});
        if(!user){
            return  res.status(404).send({
                   message: `user Not Found  For The Given Id`,
                 })
           }
         
           if(!petId){
            return  res.status(404).send({
                   message: `Please Provide  pet  Id`,
                 })
           }
           if(user.wishLists.includes(petId)){
            return  res.status(404).send({
                message: `Pet allready added to wishlist`,
              })
           }
        //    user= {...user,wishLists:[...user.wishLists, petId]}
        user.wishLists.push(petId);
        await user.save();
        res.status(201).send({
            message:'pet added to wishlist'
        })
        //    res.status(200).send(user)

    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          }) 
    }
}


exports.getPetList= async  (req,res) => {
try{
const petList =  await PET.find({
    _id:{$in:[...req.body.wishLists]}
})
res.status(200).send(petList)

}catch(e){
    res.status(500).send({
        message: `internal server error ${e}`,
      }) 
}
}