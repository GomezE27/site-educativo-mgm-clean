# SEO Quick Wins para MGM-TEC GB

Estes passos fazem seu site ficar mais amigável para motores de busca e iniciam o processo de indexação.

1) Atualizações já aplicadas
- Meta tags (`description`, `keywords`, `canonical`) adicionadas ao `index.html`.
- Open Graph e Twitter cards adicionados.
- JSON-LD (Organization) adicionado ao `index.html`.
- `sitemap.xml` e `robots.txt` criados no diretório do projeto.
- Servidor Express atualizado para servir arquivos estáticos (para testes locais e deploy simples).

2) Como verificar localmente
- Rode o servidor (veja `README_SERVER.md`).
- Acesse `http://localhost:3000/`.
- Verifique `http://localhost:3000/sitemap.xml` e `http://localhost:3000/robots.txt`.

3) Submeter ao Google Search Console
- Faça login em https://search.google.com/search-console
- Adicione propriedade (domínio) e verifique conforme instruções.
- Submeta o `sitemap.xml` em Indexação > Sitemaps.

4) Próximos passos recomendados
- Adicionar marcação JSON-LD para `WebSite`, `NewsArticle` dinâmicos e `Course` para cursos individuais.
- Implementar sitemap dinâmico se o conteúdo mudar frequentemente.
- Melhorar performance: minificar CSS/JS, otimizar imagens e usar CDN.
- Criar conteúdo de qualidade com palavras-chave alvo e estrutura H2/H3 correta.

5) Observações
- Para o Google indexar, seu site precisa estar acessível via HTTPS num domínio público.
- After deploying, aguarde algumas horas/dias para os crawlers processarem as alterações.
