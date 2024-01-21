const PAYMENTOPTION = require('../model/payment.model');
const ORDER= require('../model/order.model')
const USER = require('../model/user.model')

exports.getPaymentInfo = async(req,res) => {
    try{

  const paymentDetails = await PAYMENTOPTION.find({})
  res.status(200).send(paymentDetails)
    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          }) 
    }
  

}
exports.onPayment = async (req,res) => {
    try{
      console.log(req?.body?.transitionBy)
      let obj = {
        transitionId:req?.body?.transitionId,
        transtitionTime:req?.body?.transtitionTime,
        transitionBy:req?.body?.transitionBy,
        orderDetails:req?.body?.orderDetails
      }
      let id = req?.body?.transitionBy?.id;
      const order= await ORDER.create(obj);
      let user= await USER.findOne({ id: id});
      user.newOrder.push(order._id);
      await user.save();

  res.status(200).send({message:'order successfully'})

    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          }) 
    }

}

exports.getOrderList= async  (req,res) => {
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
                message: `pet not in your order`,
              }) 
        }
    const petList =  await ORDER.find({
        _id:{$in:[...userData?.newOrder]}
    })
    res.status(200).send(petList)
    
    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          }) 
    }
    }