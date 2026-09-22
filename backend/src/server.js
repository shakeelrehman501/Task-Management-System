import app from "./app.js";
import "dotenv/config";
import connectDB from "./database/db.js";

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, (req, res) => {
      console.log(`Server created at port: ${PORT}`);
    });
  } catch (error) {
    console.log("Server error: " + error);
  }
};

startServer();
