const express = require('express')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');

const User = require('./models/schemes').User;
const Comic = require('./models/schemes').Comic;

require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MONG_URI = 'mongodb+srv://comixai:conuhacks@comixai.qoef9rk.mongodb.net/?retryWrites=true&w=majority';
  mongoose.connect(MONG_URI)
  .then(() => {
    router.listen(3000, () => console.log('connected to db & listening on port 3000'))
    console.log('MongoDB Connected...')
  })
  .catch(err => console.log(err));

const router = express()
router.use(cors())
router.use(express.json())

router.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello!'
  })
})

router.post('/prompt', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

// Create a new user
router.post('/users', (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

// Get all users
router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

// Create a new comic
router.post('/comics', async (req, res) => {
  try {
    const comic = new Comic(req.body);
    await comic.save();
    res.send(comic);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all comics
router.get('/comics', (req, res) => {
  Comic.find({})
    .populate('author')
    .exec((err, comics) => {
      if (err) {
        res.send(err);
      } else {
        res.json(comics);
      }
    });
});

// Add a new page to a comic
router.post('/comics/:comicId/pages', (req, res) => {
  Comic.findById(req.params.comicId, (err, comic) => {
    if (err) {
      res.send(err);
    } else {
      const newPage = new Page(req.body);
      comic.pages.push(newPage);
      comic.save((err, updatedComic) => {
        if (err) {
          res.send(err);
        } else {
          res.json(updatedComic);
        }
      });
    }
  });
});

// Get all pages of a comic
router.get('/comics/:comicId/pages', (req, res) => {
  Comic.findById(req.params.comicId)
    .select('pages')
    .exec((err, pages) => {
      if (err) {
        res.send(err);
      } else {
        res.json(pages);
      }
    });
});
