// Username - string, unique, required, trimmed

// Email - string, unique, required, Must match a valid email address (validation)

// Thoughts - array of "_id" values referencing "Thought" model

// Friends - array of "_id" values referencing "User" model (self-reference)

// Schema Settings
//Create a virtual called "friendCount" that retrieves the length of the user's "friends" array field on query.