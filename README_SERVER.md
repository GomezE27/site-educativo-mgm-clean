# Servidor de Notícias para MGM-TEC GB

Este pequeno servidor Node.js fornece um endpoint `/api/news` que retorna notícias formato JSON para o front-end, evitando problemas de CORS ao buscar RSS/NewsAPI diretamente do navegador.

Pré-requisitos:
- Node.js (v14+ recomendado)
- npm

Instalação e execução local (PowerShell):

```powershell
cd "c:\Users\MGM TECHNOLOGY\Desktop\site educativo"
npm install
# Opcional: crie um arquivo .env com NEWSAPI_KEY se desejar usar NewsAPI
# Exemplo de .env (copie de .env.example):
# NEWSAPI_KEY=SUA_CHAVE_AQUI
# PORT=3000

npm start
```

O servidor ficará disponível em `http://localhost:3000` e o endpoint em `http://localhost:3000/api/news`.

Notas:
- Se `NEWSAPI_KEY` estiver presente no `.env`, o servidor tentará usar a NewsAPI (mais precisa). Caso contrário, fará fallback para um RSS público (BBC Technology) e retornará os primeiros 8 itens.
- Substitua a fonte RSS se preferir outra fonte.

Como integrar com o front-end:
- Atualize `script.js` para buscar `http://localhost:3000/api/news` (já fiz essa alteração no projeto)

Segurança:
- Não exponha `NEWSAPI_KEY` publicamente; guarde-a no `.env` do servidor.
