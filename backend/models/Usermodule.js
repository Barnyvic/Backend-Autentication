// importing mongoos
const mongoose = require("mongoose");

//creating the UsermoduleSchema
const UsermoduleSchema = new mongoose.Schema(
  {
    //defining the fields of the database
    user_Name: {
      type: String,
      required: true,
    },
    User_Email: {
      type: String,
      required: true,
      unique: true,
    },
    User_Password: {
      type: String,
      required: true,
    },
    User_Mobile: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Usermodule", UsermoduleSchema);
