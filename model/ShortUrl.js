
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  fullurl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  datecreated: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
