import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully.");
    });
   await mongoose.connect(`${process.env.MONGO_URL}`);
   
  } catch (error) {
    console.log(error.message);
 
  }
};

export default connectDB;