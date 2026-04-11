import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io'; // Injeção de Telemetria
import http from 'http';
import dns from 'dns';

import User from './models/User.js';
import Settings from './models/Settings.js';

// --- 1. DEFINIÇÃO DE AMBIENTE ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

dns.setDefaultResultOrder('ipv4first');

// --- 2. INICIALIZAÇÃO DO SERVIDOR (WRAPPER PARA SOCKET.IO) ---
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(cors());

// --- 3. CONEXÃO MONGODB ATLAS ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("🚀 MAM HQ: CONEXÃO COM ATLAS ESTABELECIDA!"))
  .catch(err => console.error("❌ ERRO ATLAS:", err.message));

// --- 4. ENGINE V12: LÓGICA DE TELEMETRIA E DISPARO ---
io.on('connection', (socket) => {
  console.log('📡 Operador conectado ao Motor:', socket.id);

  socket.on('execute_task', async (data) => {
    const { action, spreadsheetId, message, userId } = data;
    
    socket.emit('terminal_log', "[MOTOR] Verificando integridade da Service Account...");
    
    // Simulação de Varredura e Qualificação de Leads (Lead Scoring)
    // Regra: 3 campos = 🔥 | 2 campos = 🌡️ | 1 campo = ❄️
    socket.emit('terminal_log', "[SISTEMA] Varredura iniciada. Analisando colunas...");
    
    // Fallback Omnichannel: WPP (50) -> EMAIL (300)
    let wppLimit = 50;
    let emailLimit = 300;
    let currentWpp = 0;
    let currentEmail = 0;

    // TODO: Aqui entrará a integração real com o Google Sheets API
    socket.emit('terminal_log', `[SAE] Planilha ${spreadsheetId.substring(0,8)}... conectada.`);
    
    // Envio de progresso para o Dashboard
    socket.emit('task_progress', { 
      status: 'PROCESSANDO', 
      total: 1000, 
      current: 0, 
      eta: "12m" 
    });
  });

  socket.on('disconnect', () => console.log('🔌 Operador desconectado do HQ.'));
});

// --- 5. ROTAS DE API (CADASTRO E CONFIGS) ---

app.get('/', (req, res) => res.send('HQ MAM V12 Online'));

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "E-mail já cadastrado!" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Credencial V12 ativada! 🎉" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno no HQ." });
  }
});

app.get('/api/settings/:userId', async (req, res) => {
  try {
    const config = await Settings.findOne({ userId: req.params.userId });
    res.json(config || {});
  } catch (error) {
    res.status(500).json({ error: "Erro na telemetria de ajustes." });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const { userId, spreadsheetLink, adminEmail, adminPhone, abaDestino } = req.body;
    const match = spreadsheetLink.match(/[-\w]{25,}/);
    const spreadsheetId = match ? match[0] : spreadsheetLink;

    const updated = await Settings.findOneAndUpdate(
      { userId },
      { spreadsheetId, adminEmail, adminPhone, abaDestino }, // Adicionado abaDestino
      { upsert: true, new: true }
    );
    res.json({ message: "Configurações sincronizadas no Atlas! ✅", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar no banco." });
  }
});

// --- 6. IGNIÇÃO ---
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`📡 HQ OPERACIONAL NA PORTA ${PORT}`);
});