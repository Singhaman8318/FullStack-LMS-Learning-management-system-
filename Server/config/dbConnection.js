import mongoose from "mongoose";

// mongoose.set('strictQuery', false)  // for unknown query simply remove 

const connectionDb = async () => {
  try {

    const { connection } = await mongoose.connect(
      process.env.MONGODB_URL || `mongodb://127.0.0.1:27017/lms`,
      console.log("db correctvurl is ", process.env.MONGODB_URL)
    );

    if (connection) {
      console.log(`Database is successfully connected ${connection.host}`);
    }

  } catch (e) {
    console.log(e);
    process.exit(1); // kill the server if got an error
  }
};

export default connectionDb;