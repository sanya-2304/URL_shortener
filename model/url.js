const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
        unique: true
    },
    visitCount: { type: Number, default: 0 },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
}, {
    timestamps: true
});

const urlmodel = mongoose.model('url', urlSchema);

module.exports = urlmodel;
