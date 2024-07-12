// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes'); // Import the routes
const app = express();

app.use(bodyParser.json());

// Connect to database
mongoose.connect('mongodb://localhost:27017/plant-collector', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the routes
app.use('/api/users', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
