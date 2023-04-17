const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});
  
    const thoughts = thoughtData;
    const users = userData;
    
    await Thought.insertMany(thoughts);
    const foundThoughts = await Thought.find();

    users.forEach((user) =>{
      foundThoughts.forEach((thought)=> {
        if(user.username === thought.username){
          user.thoughts.push(thought._id)
        }
      })
    })

    await User.insertMany(users);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });