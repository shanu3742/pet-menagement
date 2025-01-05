const { onPayment ,onPaymentStatus,getAllOrder} = require("../controller/payment.controller");
module.exports = (app) => {
    
    app.post('/petApp/api/v1/payment/onPayment',onPayment)
    app.patch('/petApp/api/v1/payment/onPaymentStatus',onPaymentStatus)
    app.get('/petApp/api/v1/order/orderList/:userId',getAllOrder)
}