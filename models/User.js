const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    // Username - string, unique, required, trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Email - string, unique, required, Must match a valid email address (validation)
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // Thoughts - array of "_id" values referencing "Thought" model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Friends - array of "_id" values referencing "User" model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtual: true,
    },
    id: false,
  }
);

// Schema retrieves the length of the user's "friends" array field on query.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
