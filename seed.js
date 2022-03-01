'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./Models/Book');

async function seed() {
  await Book.create({
    title: 'The Growth Mindset',
    description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.',
    status: false,
    email: 'ryan@codefellows.com'
  });
  console.log('Growth Mindset!');

  await Book.create({
    title: 'Hyperion',
    description: 'On the eve of Armageddon, with the entire galaxy at war, seven pilgrims set forth on a final voyage to Hyperion seeking the answers to the unsolved riddles of their lives.',
    status: true,
    email: 'cameroncodefellows@gmail.com'
  });
  console.log('Hyperion!');

  await Book.create({
    title: 'The Queen of Attolia',
    description: 'When Eugenides finds his small mountain country at war with Attolia, he must steal a man, he must steal a queen, he must steal peace. But his greatest triumph—and his greatest loss—comes in capturing something that the Queen of Attolia thought she had sacrificed long ago.',
    status: false,
    email: 'sheyna@codefellows.com'
  });
  console.log('The Queen of Attolia!');

  await Book.create({
    title: 'The Remaining',
    description: 'In a steel-and-lead encased bunker a Special Forces soldier waits on his final orders. On the surface a bacterium has turned 90% of the population into hyper-aggressive predators. Now Captain Lee Harden must leave the bunker and venture into the wasteland to rekindle a shattered America.',
    status: false,
    email: 'percivaltanner@gmail.com'
  });
  console.log('The Remaining!');

  await Book.create({
    title: '100 Years of Solitude',
    description: 'One Hundred Years of Solitude is a 1967 novel by Colombian author Gabriel García Márquez that tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The novel is often cited as one of the supreme achievements in literature.',
    status: true,
    email: 'geneseewoodworking@gmail.com'
  });
  console.log('100 Years of Solitude!');

  mongoose.disconnect();
}

seed();
