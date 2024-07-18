const express = require('express');
const Plant = require('./models/Plant'); // Ensure you have the Plant model properly exported and imported
const router = express.Router();

// Get All Plants
router.get('/plants', async (req, res) => {
    try {
        const plants = await Plant.find();
        res.json({ plants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Plant By ID
router.get('/plants/:id', async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ success: false, message: 'Plant not found' });
        }
        res.json(plant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add New Plant
router.post('/plants', async (req, res) => {
    const { plantName, scientificName, description, imageURL, locationTags } = req.body;
    try {
        const newPlant = new Plant({ plantName, scientificName, description, imageURL, locationTags });
        await newPlant.save();
        res.json({ success: true, message: 'Plant added successfully', plant: newPlant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
