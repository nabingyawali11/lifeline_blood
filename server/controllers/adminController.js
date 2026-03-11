import User from '../models/User.js';
import Donor from '../models/Donor.js';
import Event from '../models/Event.js';

// --- Donor Management ---

export const getUnverifiedDonors = async (req, res) => {
    try {
        const donors = await Donor.find({ isVerified: false });
        res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const verifyDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) return res.status(404).json({ message: 'Donor not found' });

        donor.isVerified = true;
        await donor.save();

        const user = await User.findOne({ contactNo: donor.phoneNumber });
        if (user) {
            user.isVerified = true;
            await user.save();
        }

        res.json({ message: 'Donor verified successfully', donor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const rejectDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) return res.status(404).json({ message: 'Donor not found' });
        const phoneNo = donor.phoneNumber;
        await Donor.findByIdAndDelete(donor._id);
        const user = await User.findOne({ contactNo: phoneNo });
        if (user) await User.findByIdAndDelete(user._id);
        res.json({ message: 'Donor and user registration rejected successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Event Management ---

export const createEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
