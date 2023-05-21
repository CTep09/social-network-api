const { Schema, model, Types } = require("mongoose");
const moment = require("moment");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    // thoughtText, string, required, must be between 1 and 280 characters
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    // createdAt- date, set default value to the current timestamp, use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format("MM/DD/YYYY"),
    },
    // username (The user that created this thought): String, Required
    username: {
      type: String,
      required: true,
    },
    // reactions (These are like replies): Array of nested documents created with the "reactionSchema"
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Schema retrieves the length of the thought's "reactions" array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
