const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Debug middleware: logs every request (remove after troubleshooting)
app.use((req, res, next) => {
  console.log('[REQ]', new Date().toISOString(), req.method, req.path);
  next();
});

const PORT = process.env.PORT || 3000;
const HF_API_KEY = process.env.HUGGING_FACE_API_KEY || null;
const HF_API_URL = process.env.HF_API_URL || 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';

async function chamarHuggingFace(prompt) {
  try {
    if (!HF_API_KEY) {
      console.warn('Hugging Face API key not configured');
      return null;
    }

    const res = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
    });

    const text = await res.text();
    if (!res.ok) {
      console.error('Hugging Face returned error:', res.status, text);
      return null;
    }

    // Try parse as JSON then extract common fields
    try {
      const j = JSON.parse(text);
      // common formats: [{generated_text: '...'}] or {generated_text: '...'} or {text: '...'}
      if (Array.isArray(j) && j.length && j[0].generated_text) return j[0].generated_text;
      if (j.generated_text) return j.generated_text;
      if (j.text) return j.text;
      // if model returns different structure, stringify
      return JSON.stringify(j);
    } catch (e) {
      // response is plain text
      return text;
    }
  } catch (error) {
    console.error('Erro ao chamar Hugging Face:', error);
    return null;
  }
}

// Helpers: try extract JSON array from a generated text
function extractJsonArray(text) {
  if (!text) return null;
  const m = text.match(/\[[\s\S]*\]/);
  if (!m) return null;
  try {
    return JSON.parse(m[0]);
  } catch (e) {
    return null;
  }
}

// ENDPOINT: Gerar Cursos
app.get('/api/gerar-cursos', async (req, res) => {
  try {
    const prompt = `Gere 3 cursos de tecnologia em formato JSON (portuguÃªs).\nCada curso deve ter: titulo, descricao (uma linha), nivel (principiante/intermediario/avancado), duracao, emoji, instrutor, fonte.\nRetorne APENAS o JSON vÃ¡lido, sem explicaÃ§Ãµes.`;

    const resposta = await chamarHuggingFace(prompt);
    const cursos = extractJsonArray(resposta);
    if (cursos && cursos.length) return res.json(cursos);

    // Fallback local
    return res.json([
      { titulo: 'IntroduÃ§Ã£o Ã  ProgramaÃ§Ã£o', descricao: 'Conceitos bÃ¡sicos de programaÃ§Ã£o com Python.', nivel: 'principiante', duracao: '4 semanas', emoji: 'ðŸ', instrutor: 'Prof. Maria', url: 'https://example.com/curso1', fonte: 'Plataforma X' },
      { titulo: 'Desenvolvimento Web', descricao: 'HTML, CSS e JavaScript para construir sites responsivos.', nivel: 'intermediario', duracao: '6 semanas', emoji: 'ðŸŒ', instrutor: 'Prof. JoÃ£o', url: 'https://example.com/curso2', fonte: 'Plataforma Y' },
      { titulo: 'SeguranÃ§a CibernÃ©tica', descricao: 'PrincÃ­pios de seguranÃ§a e proteÃ§Ã£o de sistemas.', nivel: 'avancado', duracao: '8 semanas', emoji: 'ðŸ›¡ï¸', instrutor: 'Dra. Ana', url: 'https://example.com/curso3', fonte: 'Plataforma Z' }
    ]);
  } catch (error) {
    console.error('/api/gerar-cursos error:', error);
    res.status(500).json({ error: error.message || 'Erro interno' });
  }
});

// ENDPOINT: Gerar NotÃ­cias
app.get('/api/gerar-noticias', async (req, res) => {
  try {
    const prompt = `Gere 3 noticias sobre tecnologia em formato JSON (portuguÃªs).\nCada notÃ­cia deve ter: titulo, descricao (uma linha), categoria (IA/SeguranÃ§a/Hardware/Software), data (YYYY-MM-DD), conteudo (2-3 linhas), fonte.\nRetorne APENAS o JSON vÃ¡lido, sem explicaÃ§Ãµes.`;
    const resposta = await chamarHuggingFace(prompt);
    const noticias = extractJsonArray(resposta);
    if (noticias && noticias.length) return res.json(noticias);

    // Fallback
    return res.json([
      { titulo: 'AvanÃ§os em IA no Brasil', descricao: 'Novos centros de pesquisa anunciam parcerias.', categoria: 'IA', data: '2025-12-01', conteudo: 'InstituiÃ§Ãµes brasileiras firmaram parcerias...', fonte: 'Portal Tech' }
    ]);
  } catch (error) {
    console.error('/api/gerar-noticias error:', error);
    res.status(500).json({ error: error.message || 'Erro interno' });
  }
});

// ENDPOINT: Gerar DocumentÃ¡rios
app.get('/api/gerar-documentarios', async (req, res) => {
  try {
    const prompt = `Gere 3 documentarios sobre tecnologia em formato JSON (portuguÃªs).\nCada documentÃ¡rio deve ter: titulo, descricao (uma linha), categoria (historia/inovacao/impacto), duracao, emoji, diretor, youtubeId.\nRetorne APENAS o JSON vÃ¡lido, sem explicaÃ§Ãµes.`;
    const resposta = await chamarHuggingFace(prompt);
    const docs = extractJsonArray(resposta);
    if (docs && docs.length) return res.json(docs);

    // Fallback
    return res.json([
      { titulo: 'O Futuro da ComputaÃ§Ã£o QuÃ¢ntica', descricao: 'Como computadores quÃ¢nticos vÃ£o revolucionar a tecnologia.', categoria: 'inovacao', duracao: '1h 30min', emoji: 'ðŸŽ¥', diretor: 'Canal Tech PT', youtubeId: 'GdKjnVE5U1o' }
    ]);
  } catch (error) {
    console.error('/api/gerar-documentarios error:', error);
    res.status(500).json({ error: error.message || 'Erro interno' });
  }
});

// ENDPOINT: Status da API
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    huggingFace: HF_API_KEY ? 'configurado' : 'nÃ£o configurado'
  });
});

// Servir arquivos estÃ¡ticos (colocado apÃ³s as rotas para nÃ£o interferir nas APIs)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`âœ“ Servidor rodando em http://localhost:${PORT}`);
  console.log(`ðŸ§  Hugging Face API: ${HF_API_KEY ? 'Ativada' : 'NÃ£o configurada'}`);
});

