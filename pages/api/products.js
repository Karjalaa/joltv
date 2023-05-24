import { connMongoose } from "@/library/mongoose";
import Product from "../../models/Product";

export async function findProducts() {
    return Product.find().exec();
}

export default async function handle(req, res) {
    await connMongoose();
    const {ids} = req.query;
  if (ids) {
    const idsArray = ids.split(',');
    res.json(await Product.find({'_id':{$in:idsArray}}).exec());
    } else {
        res.json ( await findProducts() ); 
    }
}