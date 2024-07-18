const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes');
const plantRoutes = require('./plantRoutes');
const collectionRoutes = require('./collectionRoutes');
const app = express();

app.use(bodyParser.json());

// Connect to database
mongoose.connect('mongodb://localhost:27017/plant-collector', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api', plantRoutes);
app.use('/api', collectionRoutes); // Use collection routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//  curl -X GET http://localhost:3000/api/users/6691a0369aee2fc7a2cb2862/collection
// plant id: 6699111edb5d3e58c31bcec0
// curl -X POST http://localhost:3000/api/users/6691a0369aee2fc7a2cb2862/collection -H "Content-Type: application/json" -d '{"plantID":"6699111edb5d3e58c31bcec0","notes":"Collected from the garden"}'
