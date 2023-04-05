require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentIntent }),
        };
    } catch (error) {
        console.log({ error });

        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ error }),
        };
    }
};
