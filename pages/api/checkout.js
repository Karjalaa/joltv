const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Product from "@/models/Product";
import { connMongoose } from "@/library/mongoose";
import Order from "@/models/Order";

export default async function checkoutHandler (req, res) {
    await connMongoose();

    if (req.method !== "POST") {
        res.json("request is not POST, but it should be").send();
        return;
    }

    const productsIds = req.body.products.split(",");
    const {firstName, lastName, phoneNumber, email, address, city, infoDelivery} = req.body;
    const uniqIds = [...new Set(productsIds)];
    const products = await Product.find({_id:{$in:uniqIds}}).exec();


    let line_items = [];
    for (let productId of uniqIds) {
        const quantity = productsIds.filter(id => id === productId).length;
        const product = products.find(p => p._id.toString() === productId);

        
        line_items.push({
            quantity,
            price_data: {
                currency: "EUR",
                product_data: {name:product.name},
                unit_amount: Math.round(product.price * 100),
            },
        });
    }

    const order = await Order.create ({
        products:line_items,
        paid:0,
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        city,
        infoDelivery,
    })

    

    const session = await stripe.checkout.sessions.create ({
        line_items: line_items,
        mode: "payment",
        customer_email: email,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {orderId:order._id.toString()},
    });
    
    res.redirect(303, session.url);

}