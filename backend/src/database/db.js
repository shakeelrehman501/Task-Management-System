import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("=== DB CONNECTION START ===");
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("=== MONGODB CONNECTED ===");
    console.log("readyState:", mongoose.connection.readyState);
  } catch (error) {
    console.error("=== MONGODB CONNECTION ERROR ===");
    console.error(error);
    throw error;
  }
};

export default connectDB;


// import mongoose from "mongoose"

// const connectDB = async()=>{
//     try {
//         console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.log("MongoDB connection error: " + error);
//         throw error;
//     }
// }
// export default connectDB;