const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    plantName: { type: String, required: true },
    scientificName: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true }, // URL to the image
    stats: {
        climateChangeResilience: { type: Number, required: true }, // Scale 1-10
        environmentalThreatResistance: { type: Number, required: true } // Scale 1-10
    },
    basicInfo: {
        bloomingSeason: { type: String, required: true },
        pollinators: { type: String, required: true },
        lifespan: { type: String, required: true }
    },
    locationTags: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
