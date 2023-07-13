require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // Update with the correct URL of your React app
  }));
app.use(express.json(), express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // Update with the correct URL of your React app
  }));

const port = 8000;

app.get('/api/apiKey', (req, res) => {
    const apiKey = process.env.REACT_APP_API_KEY; // Access the API key from environment variables
    res.send(apiKey);
  });


require('./config/mongoose.config');

require('./routes/recipe.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
