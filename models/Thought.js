const { Schema, model } = require("mongoose");
const moment = require("moment");
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
  {
    // thoughtText -
    // String
    // Required
    // Must be between 1 and 280 characters
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
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
      getters: true,
    },
    id: false,
  }
);

// Schema Settings
// Create a virtual called "reactionCount" that retrieves the length of the thought's "reactions" array field on query.
thoughtSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
