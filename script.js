// Dados padrão (fallback se IA não responder)
let cursos = [];
let noticias = [];
let documentarios = [];

// INICIALIZAR PÁGINA
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 MGM-TEC GB carregado com sucesso!');
    
    mostrarStatusAtualizacao('Carregando conteúdo com IA...');
    
    // Carregar conteúdo da IA
    await carregarConteudoIA();
    
    renderizarCursos(cursos);
    renderizarNoticias(noticias);
    renderizarDocumentarios(documentarios);
    
    inicializarFiltros();
    inicializarNavegacao();
    mostrarStatusAtualizacao('✅ Conteúdo gerado por IA com sucesso!');
});

// CARREGAR CONTEÚDO DA IA
async function carregarConteudoIA() {
    try {
        console.log('🤖 Iniciando geração de conteúdo com IA...');
        
        // Determinar URL base
        const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000'
            : window.location.origin;
        
        // Carregar cursos
        try {
            const resCursos = await fetch(`${baseURL}/api/gerar-cursos`);
            if (resCursos.ok) {
                const cursosIA = await resCursos.json();
                cursos = cursosIA.map((c, i) => ({ ...c, id: i + 1 }));
                console.log('✅ Cursos carregados:', cursos.length);
            }
        } catch (e) {
            console.log('⚠️ Erro ao carregar cursos:', e.message);
            cursos = carregarCursosLocal();
        }
        
        // Carregar notícias
        try {
            const resNoticias = await fetch(`${baseURL}/api/gerar-noticias`);
            if (resNoticias.ok) {
                const noticiasIA = await resNoticias.json();
                noticias = noticiasIA.map((n, i) => ({ ...n, id: i + 1 }));
                console.log('✅ Notícias carregadas:', noticias.length);
            }
        } catch (e) {
            console.log('⚠️ Erro ao carregar notícias:', e.message);
            noticias = carregarNoticiasLocal();
        }
        
        // Carregar documentários
        try {
            const resDocs = await fetch(`${baseURL}/api/gerar-documentarios`);
            if (resDocs.ok) {
                const docsIA = await resDocs.json();
                documentarios = docsIA.map((d, i) => ({ ...d, id: i + 1 }));
                console.log('✅ Documentários carregados:', documentarios.length);
            }
        } catch (e) {
            console.log('⚠️ Erro ao carregar documentários:', e.message);
            documentarios = carregarDocumentariosLocal();
        }
    } catch (error) {
        console.error('❌ Erro geral ao carregar IA:', error);
        cursos = carregarCursosLocal();
        noticias = carregarNoticiasLocal();
        documentarios = carregarDocumentariosLocal();
    }
}

// DADOS LOCAIS (FALLBACK)
function carregarCursosLocal() {
    return [
        {
            id: 1,
            titulo: "Python Fundamentos (Google)",
            descricao: "Aprenda Python com certificação do Google",
            nivel: "principiante",
            duracao: "3 meses",
            emoji: "🐍",
            instrutor: "Google",
            url: "https://www.coursera.org/learn/python-basics-google",
            fonte: "Coursera"
        },
        {
            id: 2,
            titulo: "Data Analytics (Google)",
            descricao: "Análise de dados com ferramentas do Google",
            nivel: "intermediario",
            duracao: "6 meses",
            emoji: "📊",
            instrutor: "Google",
            url: "https://www.coursera.org/learn/data-analytics-google",
            fonte: "Coursera"
        }
    ];
}

function carregarNoticiasLocal() {
    return [
        {
            id: 1,
            titulo: "IA Revoluciona Mercado Brasileiro",
            descricao: "Empresas brasileiras adotam IA em larga escala",
            categoria: "IA",
            data: "2024-12-12",
            conteudo: "O mercado de IA no Brasil cresce exponencialmente com novas startups e investimentos.",
            fonte: "TechNews"
        },
        {
            id: 2,
            titulo: "Segurança Cibernética em Foco",
            descricao: "Brasil reforça proteção de dados com novas leis",
            categoria: "Segurança",
            data: "2024-12-11",
            conteudo: "Novas regulamentações são implementadas para proteger dados de cidadãos.",
            fonte: "Gov.br"
        }
    ];
}

function carregarDocumentariosLocal() {
    return [
        {
            id: 1,
            titulo: "História da Computação",
            descricao: "Do ENIAC aos computadores modernos",
            categoria: "historia",
            duracao: "1h 45min",
            emoji: "💻",
            diretor: "Documentários Brasil",
            youtubeId: "5KoKCjb6ZWE",
            fonte: "YouTube"
        },
        {
            id: 2,
            titulo: "Futuro da IA",
            descricao: "Como IA vai transformar a sociedade",
            categoria: "inovacao",
            duracao: "1h 30min",
            emoji: "🤖",
            diretor: "Tech Docs",
            youtubeId: "GdKjnVE5U1o",
            fonte: "YouTube"
        }
    ];
}

// STATUS DE ATUALIZAÇÃO
function mostrarStatusAtualizacao(mensagem = '✅ Conteúdo gerado por IA') {
    let statusDiv = document.getElementById('status-atualizacao');
    
    if (!statusDiv) {
        const header = document.querySelector('header');
        statusDiv = document.createElement('div');
        statusDiv.id = 'status-atualizacao';
        statusDiv.style.cssText = `
            background: rgba(0, 212, 255, 0.1);
            color: #00d4ff;
            padding: 8px 15px;
            text-align: center;
            font-size: 0.9em;
            border-bottom: 1px solid rgba(0, 212, 255, 0.2);
        `;
        header.parentElement.insertBefore(statusDiv, header.nextSibling);
    }
    
    statusDiv.textContent = `🤖 ${mensagem}`;
}

// RENDERIZAR CURSOS
function renderizarCursos(listaCursos) {
    const container = document.getElementById('cursos-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (listaCursos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888;">Carregando cursos...</p>';
        return;
    }
    
    listaCursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-nivel', curso.nivel || 'principiante');
        card.innerHTML = `
            <div class="card-image">${curso.emoji || '📚'}</div>
            <div class="card-content">
                <h3 class="card-title">${curso.titulo}</h3>
                <p class="card-description">${curso.descricao}</p>
                <div class="card-meta">
                    <span>⏱️ ${curso.duracao || '4 semanas'}</span> | <span>👨‍🏫 ${curso.instrutor || 'Online'}</span>
                </div>
                <button class="card-button" data-curso-id="${curso.id}">Saiba Mais</button>
            </div>
        `;
        
        const btn = card.querySelector('.card-button');
        btn.addEventListener('click', () => abrirDetalheCurso(curso));
        container.appendChild(card);
    });
}

// RENDERIZAR NOTÍCIAS
function renderizarNoticias(listaNoticias) {
    const container = document.getElementById('noticias-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (listaNoticias.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888;">Carregando notícias...</p>';
        return;
    }
    
    listaNoticias.forEach(noticia => {
        const card = document.createElement('div');
        card.className = 'noticia-card';
        card.setAttribute('data-categoria', noticia.categoria || 'Geral');
        
        const dataFormatada = new Date(noticia.data).toLocaleDateString('pt-BR');
        
        card.innerHTML = `
            <div class="noticia-header">
                <span class="noticia-category">${noticia.categoria || 'News'}</span>
                <h3 class="noticia-title">${noticia.titulo}</h3>
            </div>
            <div class="noticia-content">
                <p class="noticia-description">${noticia.descricao}</p>
                <p class="noticia-date">📅 ${dataFormatada}</p>
                <button class="card-button" data-noticia-id="${noticia.id}">Ler Mais</button>
            </div>
        `;
        
        const btn = card.querySelector('.card-button');
        btn.addEventListener('click', () => abrirDetalheNoticia(noticia));
        container.appendChild(card);
    });
}

// RENDERIZAR DOCUMENTÁRIOS
function renderizarDocumentarios(listaDocumentarios) {
    const container = document.getElementById('documentarios-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (listaDocumentarios.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888;">Carregando documentários...</p>';
        return;
    }
    
    listaDocumentarios.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-categoria', doc.categoria || 'geral');
        card.innerHTML = `
            <div class="card-image">${doc.emoji || '📺'}</div>
            <div class="card-content">
                <h3 class="card-title">${doc.titulo}</h3>
                <p class="card-description">${doc.descricao}</p>
                <div class="card-meta">
                    <span>⏱️ ${doc.duracao || '1h'}</span> | <span>🎬 ${doc.diretor || 'Doc'}</span>
                </div>
                <button class="card-button" data-doc-id="${doc.id}">Assistir</button>
            </div>
        `;
        
        const btn = card.querySelector('.card-button');
        btn.addEventListener('click', () => abrirDetalheDocumentario(doc));
        container.appendChild(card);
    });
}

// INICIALIZAR FILTROS
function inicializarFiltros() {
    const filtrosCursos = document.querySelectorAll('#cursos .filter-btn');
    const filtrosNoticias = document.querySelectorAll('#noticias .filter-btn');
    const filtrosDocumentarios = document.querySelectorAll('#documentarios .filter-btn');
    
    filtrosCursos.forEach(btn => {
        btn.addEventListener('click', () => filtrarSecao(btn, 'cursos', cursos, 'nivel'));
    });
    
    filtrosNoticias.forEach(btn => {
        btn.addEventListener('click', () => filtrarSecao(btn, 'noticias', noticias, 'categoria'));
    });
    
    filtrosDocumentarios.forEach(btn => {
        btn.addEventListener('click', () => filtrarSecao(btn, 'documentarios', documentarios, 'categoria'));
    });
}

// FUNÇÃO DE FILTRO
function filtrarSecao(btn, secao, dados, propriedade) {
    const botoes = btn.parentElement.querySelectorAll('.filter-btn');
    botoes.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filtro = btn.getAttribute('data-filter');
    
    let filtrados = dados;
    if (filtro !== 'todos' && filtro !== 'todas') {
        filtrados = dados.filter(item => (item[propriedade] || '').toString() === filtro);
    }
    
    if (secao === 'cursos') {
        renderizarCursos(filtrados);
    } else if (secao === 'noticias') {
        renderizarNoticias(filtrados);
    } else if (secao === 'documentarios') {
        renderizarDocumentarios(filtrados);
    }
}

// MODAIS - CURSOS
function abrirDetalheCurso(curso) {
    mostrarModal(`
        <h2>${curso.titulo}</h2>
        <p><strong>📚 Descrição:</strong> ${curso.descricao}</p>
        <p><strong>⏱️ Duração:</strong> ${curso.duracao || '4 semanas'}</p>
        <p><strong>👨‍🏫 Instrutor:</strong> ${curso.instrutor || 'Online'}</p>
        <p><strong>📌 Plataforma:</strong> ${curso.fonte || 'Online'}</p>
        <p style="margin-top: 20px; color: var(--secondary-color);">
            <strong>Conteúdo do Curso:</strong><br>
            1. Fundamentos e conceitos básicos<br>
            2. Prática hands-on com projetos<br>
            3. Estudos de caso do mundo real<br>
            4. Certificado de conclusão (gratuito)<br>
            5. Suporte da comunidade
        </p>
        <div style="margin-top: 20px; display: flex; gap: 10px;">
            <button class="card-button" style="background-color: #4CAF50; flex: 1;" onclick="window.open('${curso.url || '#'}', '_blank'); return false;">🔗 Acessar Curso</button>
        </div>
    `, 'curso');
}

// MODAIS - NOTÍCIAS
function abrirDetalheNoticia(noticia) {
    mostrarModal(`
        <h2>${noticia.titulo}</h2>
        <span class="noticia-category" style="display: inline-block; padding: 5px 10px; background: rgba(0,212,255,0.2); border-radius: 5px; color: #00d4ff; margin-bottom: 15px;">${noticia.categoria || 'News'}</span>
        <p style="margin-top: 15px; font-size: 0.9em; color: #888;">📅 ${new Date(noticia.data || new Date()).toLocaleDateString('pt-BR')} | Fonte: <strong>${noticia.fonte || 'TechNews'}</strong></p>
        <div style="margin-top: 20px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; line-height: 1.6;">
            <h3 style="margin-top: 0;">📰 Conteúdo</h3>
            <p>${noticia.descricao}</p>
            <p>${noticia.conteudo}</p>
        </div>
    `, 'noticia');
}

// MODAIS - DOCUMENTÁRIOS
function abrirDetalheDocumentario(doc) {
    const youtubeEmbed = `
        <div style="position: relative; width: 100%; padding-bottom: 56.25%; margin-bottom: 20px; background: #000;">
            <iframe 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; border: none;"
                src="https://www.youtube.com/embed/${doc.youtubeId || 'dQw4w9WgXcQ'}?autoplay=0&controls=1&modestbranding=1&rel=0&cc_load_policy=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
    `;
    
    mostrarModal(`
        <h2>${doc.titulo}</h2>
        <p><strong>📺 Descrição:</strong> ${doc.descricao}</p>
        <p><strong>⏱️ Duração:</strong> ${doc.duracao || '1h'} | <strong>🎬 Canal:</strong> ${doc.diretor || 'Doc'}</p>
        ${youtubeEmbed}
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
            <h3 style="margin-top: 0;">ℹ️ Informações</h3>
            <p>✓ Conteúdo em português</p>
            <p>✓ Reprodutor completo com controles</p>
            <p>✓ Assistindo 100% dentro do site MGM-TEC GB</p>
        </div>
    `, 'documentario');
}

// FUNÇÃO MODAL GENÉRICA
function mostrarModal(conteudo, tipo = 'padrao') {
    let modal = document.getElementById('detalheModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'detalheModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    const modalStyle = tipo === 'documentario' ? 'max-height: 95vh; overflow-y: auto;' : '';
    
    modal.innerHTML = `
        <div class="modal-content" style="${modalStyle}">
            <div class="modal-header">
                <button class="close-btn" onclick="fecharModal()">&times;</button>
            </div>
            <div style="padding: 20px;">${conteudo}</div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// FECHAR MODAL
function fecharModal() {
    const modal = document.getElementById('detalheModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// FECHAR MODAL AO CLICAR FORA
window.onclick = function(event) {
    const modal = document.getElementById('detalheModal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
};

// NAVEGAÇÃO SUAVE
function inicializarNavegacao() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const elemento = document.querySelector(target);
            
            if (elemento) {
                elemento.scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// BUSCA GLOBAL
function buscarConteudo(termo) {
    const resultado = [];
    
    cursos.forEach(c => {
        if ((c.titulo || '').toLowerCase().includes(termo.toLowerCase()) || 
            (c.descricao || '').toLowerCase().includes(termo.toLowerCase())) {
            resultado.push({ tipo: 'Curso', ...c });
        }
    });
    
    noticias.forEach(n => {
        if ((n.titulo || '').toLowerCase().includes(termo.toLowerCase()) || 
            (n.descricao || '').toLowerCase().includes(termo.toLowerCase())) {
            resultado.push({ tipo: 'Notícia', ...n });
        }
    });
    
    documentarios.forEach(d => {
        if ((d.titulo || '').toLowerCase().includes(termo.toLowerCase()) || 
            (d.descricao || '').toLowerCase().includes(termo.toLowerCase())) {
            resultado.push({ tipo: 'Documentário', ...d });
        }
    });
    
    return resultado;
}
