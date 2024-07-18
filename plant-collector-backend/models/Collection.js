const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plantID: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
    collectedAt: { type: Date, default: Date.now },
    notes: { type: String }
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
