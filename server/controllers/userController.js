import User from '../models/User.js';
import Donor from '../models/Donor.js';
import bcrypt from 'bcryptjs';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return res.json({
                user: { email, role: 'admin' },
                token: 'true'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Specifically block users that have been marked as unverified.
        if (user.isVerified === false) {
            return res.status(403).json({ message: 'Your account is pending admin approval. You cannot login yet.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            user: { email: user.email, role: 'user', fullName: user.fullName },
            token: 'true'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const donor = await Donor.findOne({ phoneNumber: user.contactNo });
        res.json({ user, donor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const toggleAvailability = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const donor = await Donor.findOne({ phoneNumber: user.contactNo });
        if (!donor) {
            return res.status(404).json({ message: 'Donor record not found' });
        }
        donor.isAvailable = !donor.isAvailable;
        await donor.save();
        res.json({ isAvailable: donor.isAvailable });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
