import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js'; // 📦 Trazendo o "Cofre" que criamos!

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("🚀 MAM CONECTADO COM SUCESSO!"))
  .catch(err => console.error("❌ Erro de conexão:", err.message));

// Rota de Teste (Aquela que você viu no navegador)
app.get('/', (req, res) => {
  res.send('Servidor do MAM rodando perfeitamente...');
});

// 🚀 ROTA DE CADASTRO: Onde a mágica acontece
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Este email já está cadastrado!" });
    }

    // 2. Cria e salva o novo usuário no banco de dados
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso no MAM! 🎉" });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// A Render escolhe a porta automaticamente
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📡 Servidor rodando na porta ${PORT}`);
});