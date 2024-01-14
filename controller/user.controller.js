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
    let id = req?.params?.userId;
    if(!id){
        return   res.status(400).send({
            message: `please provided user id`,
          }) 
    }
    let userData=    await USER.findOne({ id: id});

    if(!userData?.wishLists?.length){
        return   res.status(400).send({
            message: `pet not in your wishlish`,
          }) 
    }
const petList =  await PET.find({
    _id:{$in:[...userData?.wishLists]}
})
res.status(200).send(petList)

}catch(e){
    res.status(500).send({
        message: `internal server error ${e}`,
      }) 
}
}

exports.deletePetList = async(req,res) => {
        try{
            console.log(req.params)
            let id= req.params?.userId;
            let petId= req.params?.petId;
            if(!petId){
              return  res.status(400).send({
                    message: `id not provided`,
                  }) 
            }
            let user= await USER.findOne({ id: id});
            console.log('user',user)
           if(!user?.wishLists?.includes(petId)){
            return  res.status(400).send({
                message: `pet allready removed or not in your wishlish`,
              }) 
           }
           
           let petList =user.wishLists;
           let filterPetList =petList.filter((el) => el !==petId)

           user.wishLists= [...filterPetList];
           await user.save();

           if(!user.wishLists.length){
           return res.status(200).send([])
           }
           const petListToSave=  await PET.find({
            _id:{$in:[...user.wishLists]}
        })

           res.status(200).send(petListToSave)

        }catch(e){
            res.status(500).send({
                message: `internal server error ${e}`,
              })  
        }
}

