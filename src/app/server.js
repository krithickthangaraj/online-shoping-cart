const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3039;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/feedbackdb', { useNewUrlParser: true, useUnifiedTopology: true });

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send(feedback);
    console.log('Feedback saved successfully:', feedback);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
