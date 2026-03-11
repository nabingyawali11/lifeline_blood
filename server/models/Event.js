import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  lat: { type: Number, default: 0 },
  lon: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  contact: { type: String, required: true },
});

export default mongoose.model('Event', eventSchema);