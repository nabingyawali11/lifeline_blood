import mongoose from 'mongoose';

const DonorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    geohash: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    lastDonated: {
        type: Date
    },
    address: String,
    proofDocument: {
        type: String, // Base64 image
        required: true
    },
    proofType: {
        type: String,
        enum: ['Driving License', 'Hospital Form'],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Donor = mongoose.model('Donor', DonorSchema);
export default Donor;