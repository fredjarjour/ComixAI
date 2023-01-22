const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/schemes').User;
const Comic = require('./models/schemes').Comic;
const Panel = require('./models/schemes').Panel;

require('dotenv').config();

const configuration = new Configuration({
  organization: 'org-DrkO8FCiScMVM7ofmp3FvXvf',
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

const MONG_URI = 'mongodb+srv://comixai:conuhacks@comixai.qoef9rk.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONG_URI)
  .then(() => {
    app.listen(3000, () => console.log('connected to db & listening on port 3000'));
    console.log('MongoDB Connected...');
  })
  .catch(err => console.log(err));

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello!'
  })
})

app.post('/prompt', async (req, res) => {
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
app.post('/users', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    res.status(200).send(newUser);
  } catch(err) {
    res.status
  }
});

// Get all users
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

// Create a new comic
app.post('/comics', async (req, res) => {
  try {
    console.log(req.body);
    const comic = new Comic(req.body);
    await comic.save();
    res.send(comic);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all comics
app.get('/comics', (req, res) => {
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

// Add new panels to a comic
app.post('/comics/:comicId/panels', (req, res) => {
  Comic.findById(req.params.comicId, (err, comic) => {
    if (err) {
      res.send(err);
    } else {
      const panels = (req.body);
      panels.forEach(panel => {
        const newPanel = new Panel(panel);
        comic.panels.push(newPanel);
      });
      comic.panels.push(newPanel);
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

// add prompt to comic
app.post('/comics/:comicId/prompt', async (req, res) => {
    try {
      const comic = await Comic.findById(req.params.comicId);
      comic.comic_prompt = req.body.new_prompt;
      await comic.save();
      res.json({ message: 'Prompt sccessfully concatenated!' + comic.comic_prompt });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

/* app.get('/comics/:comicId/panels', (req, res) => {
  Comic.findById(req.params.comicId)
    .select('panels')
    .exec((err, panels) => {
      if (err) {
        res.send(err);
      } else {
        res.json(panels);
      }
    });
}); */
