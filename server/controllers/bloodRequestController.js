import Donor from '../models/Donor.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import getDistance from '../utils/haversine.js';


export const findDonors = async (req, res) => {
    const { hospitalLat, hospitalLon, bloodGroup, radius } = req.body;

    try {
        const donors = await Donor.find({ bloodGroup, isAvailable: true, isVerified: true });

        const nearbyDonors = donors.filter((donor) => {
            const distance = getDistance(hospitalLat, hospitalLon, donor.lat, donor.lon);
            return distance <= radius;
        });

        res.json({
            success: true,
            count: nearbyDonors.length,
            donors: nearbyDonors,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const registerDonor = async (req, res) => {
    try {
        const { fullName, age, contactNo, bloodGroup, email, password, lat, lon, proofDocument, proofType } = req.body;

        if (!fullName || !age || !contactNo || !bloodGroup || !email || !password || !lat || !lon || !proofDocument || !proofType) {
            return res.status(400).json({ message: 'All fields including proof document and type are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { contactNo }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with given email or contact already exists.' });
        }

        const existingDonor = await Donor.findOne({ phoneNumber: contactNo });
        if (existingDonor) {
            return res.status(400).json({ message: 'Donor with given contact already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = new User({ fullName, age, contactNo, bloodGroup, email, password: hashed, isVerified: false });
        await newUser.save();

        const newDonor = new Donor({
            fullName,
            bloodGroup,
            phoneNumber: contactNo,
            lat,
            lon,
            proofDocument,
            proofType,
            isAvailable: true,
            isVerified: false
        });
        await newDonor.save();

        res.status(201).json({ message: 'User and donor created successfully. Pending admin verification.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
