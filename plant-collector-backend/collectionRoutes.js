const express = require('express');
const Collection = require('./models/Collection');
const Plant = require('./models/Plant');
const router = express.Router();

// Get User Collection
router.get('/users/:userID/collection', async (req, res) => {
    try {
        const collections = await Collection.find({ userID: req.params.userID }).populate('plantID');
        res.json({ collections });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add Plant to Collection
router.post('/users/:userID/collection', async (req, res) => {
    const { plantID, notes } = req.body;
    try {
        const newCollection = new Collection({ userID: req.params.userID, plantID, notes });
        await newCollection.save();
        res.json({ success: true, message: 'Plant added to collection', collection: newCollection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update Collection Note
router.put('/users/:userID/collection/:collectionID', async (req, res) => {
    try {
        const collection = await Collection.findByIdAndUpdate(
            req.params.collectionID,
            { notes: req.body.notes },
            { new: true }
        );
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }
        res.json({ success: true, message: 'Collection updated', collection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Remove Plant from Collection
router.delete('/users/:userID/collection/:collectionID', async (req, res) => {
    try {
        const collection = await Collection.findByIdAndDelete(req.params.collectionID);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }
        res.json({ success: true, message: 'Collection removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
