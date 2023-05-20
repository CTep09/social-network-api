const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create an array of thoughts
  const thoughts = [
    {
      thoughtText: "I love coding!",
      createdAt: "2023-05-19",
      username: "john_doe",
      reactions: []
    },
    {
      thoughtText: "Today is a beautiful day.",
      createdAt: "2023-05-18",
      username: "jane_smith",
      reactions: []
    },
    {
      thoughtText: "Just finished reading a great book.",
      createdAt: "2023-05-17",
      username: "bob_johnson",
      reactions: []
    }
  ];

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Add User to the collection and await the results
  await User.create({
    username: 'Biskers',
    email: 'biscuit@woof.com',
    thoughts: thoughts.map(thought => thought._id),
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});