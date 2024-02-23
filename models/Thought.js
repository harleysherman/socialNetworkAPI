// Backed by collection and database
const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (date) {
        console.log(date);
        return `${new Date(date).getDate()}/${new Date(date).getMonth()+1}/${new Date(date).getFullYear()}`;
      },
    },
    userName: { type: String, required: true },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
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
