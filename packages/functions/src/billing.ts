import Stripe from "stripe";
import { Resource } from "sst";
import { Util } from "@sst-notes/core/util";
import { Billing } from "@sst-notes/core/billing";

export const main = Util.handler(async (event) => {
    const { storage, source } = JSON.parse(event.body || "{}");
    const amount = Billing.compute(storage);
    const description = "Scratch charge";
    const stripe = new Stripe(
        //load our secret key
        Resource.StripeSecretKey.value,
        { apiVersion: "2024-06-20" }, //2024-09-30.acacia
    );
    await stripe.charges.create({
        source, 
        amount,
        description,
        currency: "usd"
    });
    return JSON.stringify({status: true});
});