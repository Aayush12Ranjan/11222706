
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  fullUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
