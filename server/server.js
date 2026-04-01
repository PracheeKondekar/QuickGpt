import 'dotenv/config';
import express from 'express';
import cors from 'cors';


import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';
const app = express();
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
//stripe webhooks
app.post('/api/stripe', express.raw({type:'application/json'}),
stripeWebhooks)


// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/stripe', (req, res) => {
  console.log("STRIPE HIT TEST ✅");
  res.sendStatus(200);
});
//Routes
app.get('/', (req, res) => {
    res.send('server is running');
});
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter)
app.use('/api/message',messageRouter) 
app.use('/api/credit',creditRouter)

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });