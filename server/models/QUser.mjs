import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();
import findOrCreate from "mongoose-findorcreate";

const QUserSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,


  },

  userImg: {
    type: String,
  },
  method: { type: String },
});

QUserSchema.plugin(findOrCreate);
const QUserModel = model("QUser", QUserSchema);

export default QUserModel;
