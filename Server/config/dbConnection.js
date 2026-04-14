// import mongoose from "mongoose";

// // mongoose.set('strictQuery', false)  // for unknown query simply remove 

// const connectionDb = async () => {
//   try {

//     const { connection } = await mongoose.connect(
//       process.env.MONGODB_URL || `null`,
//       console.log("db correctvurl is ", process.env.MONGODB_URL)
//     );

//     if (connection) {
//       console.log(`Database is successfully connected ${connection.host}`);
//     }

//   } catch (e) {
//     console.log(e);
//     process.exit(1); // kill the server if got an error
//   }
// };

// export default connectionDb;



import mongoose from "mongoose";

const connectionDb = async () => {
  try {
    // Log it separately before connecting
    console.log("Attempting to connect to:", process.env.MONGODB_URL);

    const { connection } = await mongoose.connect(process.env.MONGODB_URL);

    if (connection) {
      console.log(`Database is successfully connected: ${connection.host}`);
    }
  } catch (e) {
    console.log("Database connection error:", e.message);
    process.exit(1);
  }
};

export default connectionDb;