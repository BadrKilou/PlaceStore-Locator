const mongoose = require('mongoose');
const geoCoder = require('../utils/geocoder')

const PlaceSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Please fill in an address'],
        unique: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number], 
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// Convert Code before saving

PlaceSchema.pre('save', async function(next) {
    const loc = await geoCoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress

    };

    // Do not save address

    this.address = undefined;
    next();
})




module.exports = new mongoose.model('Places', PlaceSchema)