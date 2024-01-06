const USER = require('../model/user.model')
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