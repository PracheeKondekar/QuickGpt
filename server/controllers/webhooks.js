

// import Stripe from 'stripe'
// import Transaction from '../models/Transaction.js';
// import User from '../models/User.js';
//    import mongoose from "mongoose";

// export const stripeWebhooks = async (req, res) => {
// console.log("WEBHOOK HIT ")
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//     const sig = req.headers["stripe-signature"]

//     let event;

//     // ✅ Verify webhook signature
//     try {
//         event = stripe.webhooks.constructEvent(
//             req.body,
//             sig,
//             process.env.STRIPE_WEBHOOKS_SECRET
//         )
//         console.log("webhooks verified", event.type)
//     } catch (error) {
//         console.log("failed", error.message)
//         return res.status(400).send(`Webhook error : ${error.message}`)
//     }

//     try {

//         switch (event.type) {

//             // ✅ FIXED EVENT TYPE
//             case "checkout.session.completed": {

//                 const session = event.data.object;

//                 const { transactionId, appId } = session.metadata;
// console.log("METADATA:", session.metadata);
// await new Promise(res => setTimeout(res, 1000));
//                 // ✅ Check correct app
//                 if (appId === 'quickgpt') {

//                     // const transaction = await Transaction.findOne({
//                     //     _id: transactionId,
//                     //     isPaid: false
//                     // });
//                     const transaction = await Transaction.findById(transactionId);

// if (!transaction) {
//   console.log("Transaction not found");
//   return res.json({ received: true });
// }

// if (transaction.isPaid) {
//   console.log("Already paid");
//   return res.json({ received: true });
// }

//     console.log("Transaction:", transaction);
//                     // ✅ Safety check
//                     if (!transaction) {
//                         console.log("Transaction not found or already paid");
//                         return res.json({ received: true });
//                     }

//                     // ✅ Update user credits
// //                await User.updateOne(
// //   { _id: new mongoose.Types.ObjectId(transaction.userId) },
// //   { 
// //     $inc: { credits: transaction.credits }
// //   }
// // );
// await User.findByIdAndUpdate(
//   transaction.userId,
//   { $inc: { credits: transaction.credits } }
// );

// // await User.updateOne(
// //     { _id: new mongoose.Types.ObjectId(transaction.userId) },
// //     { 
// //         $inc: { credits: transaction.credits },
// //         isPaid: true
// //     }
// //);

//         // 🔍 ADD THIS DEBUG LINE HERE 👇
//         const user = await User.findById(transaction.userId);
//         console.log("UPDATED USER:", user);



//                     // ✅ Mark as paid
//                     transaction.isPaid = true;
//                     await transaction.save();

//                     console.log(" Payment success, credits added");
//                 } else {
//                     return res.json({
//                         received: true,
//                         message: "Ignored event: Invalid app"
//                     })
//                 }

//                 break;
//             }

//             default:
//                 console.log("Unhandled event type:", event.type)
//                 break;
//         }

//         res.json({ received: true });

//     } catch (error) {
//         console.error("Webhook processing error:", error)
//         res.status(500).send("Internal Server Error")
//     }
// }
import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔹 Common handler for updating credits
const handlePayment = async (transactionId, appId) => {
  if (appId !== "quickgpt") {
    console.log("Invalid app");
    return;
  }

  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    console.log("Transaction not found");
    return;
  }

  if (transaction.isPaid) {
    console.log("Already paid");
    return;
  }

  // ✅ Update user credits
  await User.findByIdAndUpdate(
    transaction.userId,
    { $inc: { credits: transaction.credits } }
  );

  // ✅ Mark transaction as paid
  transaction.isPaid = true;
  await transaction.save();

  const user = await User.findById(transaction.userId);
  console.log("UPDATED USER:", user);

  console.log("✅ Payment success, credits added");
};

// 🔹 Webhook Controller
export const stripeWebhooks = async (req, res) => {
  console.log("🔥 WEBHOOK HIT");

  const sig = req.headers["stripe-signature"];
  let event;

  // ✅ Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET
    );
    console.log("✅ Webhook verified:", event.type);
  } catch (error) {
    console.log("❌ Verification failed:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  try {
    switch (event.type) {

      // ✅ Main event (recommended)
      case "checkout.session.completed": {
        const session = event.data.object;
        const { transactionId, appId } = session.metadata;

        console.log("📦 METADATA:", session.metadata);

        await handlePayment(transactionId, appId);
        break;
      }

      // ✅ Backup event (important)
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;

        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        const session = sessions.data[0];

        if (!session) {
          console.log("No session found");
          break;
        }

        const { transactionId, appId } = session.metadata;

        console.log("📦 METADATA (PI):", session.metadata);

        await handlePayment(transactionId, appId);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    res.json({ received: true });

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.status(500).send("Internal Server Error");
  }
};