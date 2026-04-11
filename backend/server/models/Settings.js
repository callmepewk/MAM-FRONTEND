import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  spreadsheetId: { type: String, required: true },
  adminEmail: { type: String },
  adminPhone: { type: String },
  abaDestino: { type: String, default: 'Página1' }, // Campo essencial para o Motor V12
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Settings', SettingsSchema);