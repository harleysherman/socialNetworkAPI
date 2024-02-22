// Backed by collection and database
const { Schema, model } = require("mongoose");
const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)};

// Schema to create User model
const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true,  validate: [validateEmail, `Please fill a valid email address`],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, `Please fill a valid email address`] },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
