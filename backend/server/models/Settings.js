import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    spreadsheetId: { type: String, default: '' },
    adminEmail: { type: String, default: '' },
    adminPhone: { type: String, default: '' },
    abaDestino: { type: String, default: 'Página1' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);