// SCHEMA ONLY
const { Schema, Types } = require("mongoose");

// Schema for what makes up a comment
const reactionSchema = new Schema({
  reactionID: { type: Schema.Types.ObjectId, default: new Types.ObjectId() },
  reactionBody: { type: String, required: true, maximum: 280 },
  userName: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: function (date) {
      console.log(date);
      return `${new Date(date).getDate()}/${
        new Date(date).getMonth() + 1
      }/${new Date(date).getFullYear()}`;
    },
  },
},
{
  toJSON: {
    getters: true,
  },
}
);

module.exports = reactionSchema;
