const PetModel=require('../model/pet.model')
const PaymentModel=require('../model/payment.model')
const {Cashfree}=require("cashfree-pg")
const AppConfig=require('../config/app.config')
exports.onPayment=async(req,res)=>{
 
  try{
  const productId=req.body.productId;
  const userId=req.body.userId;

Cashfree.XClientId = process.env.XCLIENT_ID;
Cashfree.XClientSecret = process.env.XCLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const product=await  PetModel.findById(productId)
if (!product) {
  return res.status(404).send({ error: "Product not found" });
}
let orderObj={
  productId:product?._id,
  userId:userId,
  productName:product?.name,
  productDescription:product?.shortdescription,
  productImage:product?.image,
  amount:(product?.price),
  
}
let SavedOrder=await PaymentModel.create(orderObj)

var request = {
  "order_amount": +(SavedOrder.amount),
  "order_currency": "INR",
  "order_id": SavedOrder._id,
  "customer_details": {
    "customer_id": SavedOrder.userId,
    "customer_phone":'8767564543'
  },
  
  "order_meta": {
    "return_url": `${AppConfig.APP_CONFIG.ClientBase_Url}/home/Payment/scccess/${SavedOrder._id}`
  },

}
// Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
// })
let paymentResponse=await Cashfree.PGCreateOrder("2023-08-01", request)
console.log(paymentResponse.data,'paymentResponse')
res.status(200).send(paymentResponse.data)
  }
  catch(err){
    console.log(err,'error on Pyment');
  }
}

exports.onPaymentStatus = async (req,res) => {
  try{
      Cashfree.XClientId = process.env.XCLIENT_ID;
      Cashfree.XClientSecret = process.env.XCLIENT_SECRET;
  Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
  let orderId= req.body.orderId;
  let getOrderResponse = await Cashfree.PGOrderFetchPayments("2023-08-01",orderId)
  orderStatus=''
   if(getOrderResponse.data.filter(transaction => transaction.payment_status === "SUCCESS").length > 0){
        orderStatus = "success"
    }else if(getOrderResponse.data.filter(transaction => transaction.payment_status === "PENDING").length > 0){
        orderStatus = "pending"
    }else{
        orderStatus = "failure"
    }
 
   let savedOrder=await PaymentModel.findById(getOrderResponse.data[0].order_id);
   //console.log('saved order',savedOrder)
      savedOrder.paymentStatus=orderStatus,
      savedOrder.transitionId=orderId
      await savedOrder.save()
res.status(200).send({
  message:'order placed successfully'
})

}
catch(e){
console.log(e)
res.status(500).send({
  message:'server error'

})
}
}

exports.getAllOrder=async(req,res)=>{
  try{
    const userId=req.params.userId
    const orderList=await PaymentModel.find({userId:userId,paymentStatus:'success'}).populate('productId')
    
    console.log(orderList)
    res.status(200).send(orderList)

  }
  catch(e){
    console.log(e)
    res.status(500).send(e)
  }

}