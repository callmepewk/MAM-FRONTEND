import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import User from './models/User.js';
import Settings from './models/Settings.js';

// --- 1. DEFINIÇÃO DOS CAMINHOS (ORDEEM CORRETA) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Agora sim, o __dirname já existe e podemos usá-lo para achar o .env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// --- 2. CONFIGURAÇÕES DE REDE ---
dns.setDefaultResultOrder('ipv4first');

// Log de Debug para o CTO
console.log("📂 Procurando .env em:", envPath);
console.log("🔍 Status da URI no process.env:", process.env.MONGODB_URI ? "OK ✅" : "NÃO ENCONTRADA ❌");

// --- 3. INICIALIZAÇÃO DO APP ---
const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("🚀 MAM CONECTADO COM SUCESSO!"))
  .catch(err => {
    console.error("❌ Erro de conexão:");
    console.error(err.message);
  });

app.get('/', (req, res) => {
  res.send('Servidor do MAM rodando perfeitamente...');
});

// ROTA DE CADASTRO
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Este email já está cadastrado!" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Usuário cadastrado com sucesso! 🎉" });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});
// BUSCAR CONFIGURAÇÕES (Para preencher os campos do site e tirar o placeholder)
app.get('/api/settings/:userId', async (req, res) => {
  try {
    const config = await Settings.findOne({ userId: req.params.userId });
    res.json(config || {});
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar configurações" });
  }
});

// SALVAR/ATUALIZAR CONFIGURAÇÕES (Quando o médico cola o link da planilha)
app.post('/api/settings', async (req, res) => {
  try {
    const { userId, spreadsheetLink, adminEmail, adminPhone } = req.body;
    
    // Extrai o ID da URL da planilha caso o usuário cole o link inteiro
    const match = spreadsheetLink.match(/[-\w]{25,}/);
    const spreadsheetId = match ? match[0] : spreadsheetLink;

    const updated = await Settings.findOneAndUpdate(
      { userId },
      { spreadsheetId, adminEmail, adminPhone },
      { upsert: true, new: true }
    );
    res.json({ message: "Dados salvos com sucesso no MAM! ✅", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar dados" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📡 Servidor rodando na porta ${PORT}`);
});