import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    name: String,
    desc: String,
    price: Number,
    category: String,
    pic: String,
    kgprice: Number,
});

const Product = models?.Product || model('Product', ProductSchema);

export default Product;