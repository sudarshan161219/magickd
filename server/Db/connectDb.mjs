// import mongoose from "mongoose";


// const connectDB = (uri) => {
//   mongoose.set("strictQuery", true);
//   return mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export default connectDB;
