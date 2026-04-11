import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io'; // Essencial para o Motor V12
import http from 'http';

// Importando os Modelos (Ajustado o caminho caso o arquivo esteja na pasta 'server')
import User from './models/User.js';
import Settings from './models/Settings.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARES ---
app.use(express.json());
app.use(cors());

// --- CONEXÃO MONGODB ATLAS ---
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("🚀 MAM BACKEND: CONEXÃO COM ATLAS ESTABELECIDA!"))
  .catch(err => console.error("❌ ERRO ATLAS:", err.message));

// --- LÓGICA DO MOTOR (SOCKET.IO) ---
io.on('connection', (socket) => {
  console.log('📡 Novo operador conectado ao Motor V12:', socket.id);

  socket.on('execute_task', (data) => {
    // Simulação de Logs para o Terminal do Frontend
    socket.emit('terminal_log', `[MOTOR] Iniciando sequência: ${data.action.toUpperCase()}...`);
    
    setTimeout(() => {
      socket.emit('terminal_log', `[SISTEMA] Conectando à planilha: ${data.spreadsheetId.substring(0, 8)}...`);
    }, 1000);

    // Aqui entrará sua lógica real de Puppeteer/WhatsApp futuramente
  });

  socket.on('disconnect', () => console.log('🔌 Operador desconectado.'));
});

// --- ROTAS API ---

app.get('/', (req, res) => res.send('MAM V12 API Online'));

// 🔐 Rota de Cadastro
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "E-mail já registrado no sistema." });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Credencial V12 gerada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro na ativação do registro." });
  }
});

// ⚙️ Buscar Configurações
app.get('/api/settings/:userId', async (req, res) => {
  try {
    const config = await Settings.findOne({ userId: req.params.userId });
    res.json(config || {});
  } catch (error) {
    res.status(500).json({ error: "Falha na telemetria de dados." });
  }
});

// ⚙️ Salvar/Atualizar Configurações (Com campo abaDestino)
app.post('/api/settings', async (req, res) => {
  try {
    const { userId, spreadsheetLink, adminEmail, adminPhone, abaDestino } = req.body;
    
    // Filtro de ID de Planilha
    const match = spreadsheetLink.match(/[-\w]{25,}/);
    const spreadsheetId = match ? match[0] : spreadsheetLink;

    const updated = await Settings.findOneAndUpdate(
      { userId },
      { spreadsheetId, adminEmail, adminPhone, abaDestino },
      { upsert: true, new: true }
    );
    res.json({ message: "Sincronização com Atlas concluída! ✅", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Erro ao sincronizar configurações." });
  }
});

// --- INICIALIZAÇÃO ---
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`📡 HQ OPERACIONAL NA PORTA ${PORT}`);
});