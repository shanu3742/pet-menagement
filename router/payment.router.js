const { getPaymentInfo, onPayment, getOrderList } = require("../controller/payment.controller");
module.exports = (app) => {
    app.get('/petApp/api/v1/payment/paymentinfo',getPaymentInfo)
    app.post('/petApp/api/v1/payment/paymentConfirmation',onPayment);
    app.get('/petApp/api/v1/order/orderList/:userId',getOrderList)
}