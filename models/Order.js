import { model, models, Schema } from "mongoose"

const OrderSchema = new Schema ({
    products: Object,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    address: String,
    city: String,
    infoDelivery: String,
    paid: {type:Number,defaultValue:0},
}, {timestamps: true});

const Order = models?.Order || model('Order', OrderSchema);

export default Order;