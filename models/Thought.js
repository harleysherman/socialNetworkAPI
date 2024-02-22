// Backed by collection and database
const { Schema, model } = require("mongoose");
const Reaction = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1,
        maxLength: 280 },
    createdAt: { type: Date, default: Date.now() },
    userName: { type: String, required: true },
    reactions: [ Reaction ],
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

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
