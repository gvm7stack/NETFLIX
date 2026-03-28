# Netflix Clone - Imersão Front-End Alura

Clone da interface da Netflix desenvolvido durante a Imersão Front-End da Alura, com melhorias personalizadas.

## 🚀 Status
✅ **Completo e funcional** — Interface responsiva com perfis personalizados, catálogo dinâmico e modal de trailers.

## ✨ Funcionalidades
- ✅ **Tela de seleção de perfis** responsiva com 4 perfis (Gustavo, Rafaela, Davi, Meg)
- ✅ **Catálogo personalizado** por perfil: filmes e séries favoritados via API TMDB
- ✅ **Modal de trailers** integrado — clique em um filme para assistir trailer no YouTube
- ✅ **Dark/Light Mode** com toggle fixo (persistência em localStorage)
- ✅ HTML semântico com tags `<header>`, `<section>`, `<article>`, `<figure>`
- ✅ Design responsivo (desktop, tablet, mobile)
- ✅ Acessibilidade (aria-labels, aria-pressed, role attributes)

## 🎨 Dark/Light Mode
- Botão de alternância no canto superior direito
- Ícones: ☀️ (modo claro) / ☾ (modo escuro)
- Preferência salva em `localStorage`
- Detecção automática de preferência do sistema (`prefers-color-scheme`)

## 🛠️ Tecnologias Utilizadas
- **HTML5** — Estrutura semântica
- **CSS3** — Estilos responsivos e animações
- **JavaScript (Vanilla)** — Lógica dinâmica, API TMDB, modal de trailers
- **TMDB API** — Dados de filmes e séries (chave pública para uso educacional)

## 📁 Estrutura do Projeto
```
netflix_updated/
├── index.html          # Página principal
├── assets/
│   ├── styles.css      # Estilos principais
│   ├── theme.js        # Toggle dark/light mode
│   ├── catalog.js      # Lógica de perfis e catálogo
│   ├── trailer.css     # Estilos do modal de trailer
│   └── perfil[1-4].jpg # Imagens dos perfis
└── README.md           # Este arquivo
```

## 🚀 Como Usar
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gvm7stack/NETFLIX.git
   cd NETFLIX
   ```

2. **Abra no navegador:**
   - Abra `index.html` diretamente no navegador (funciona localmente, sem servidor).

3. **Navegue:**
   - Selecione um perfil.
   - Explore o catálogo personalizado.
   - Clique em um filme/série para abrir o trailer.

## 🔧 Personalização
- Edite `assets/catalog.js` para adicionar/remover perfis ou filmes.
- IDs de filmes/séries vêm da [TMDB API](https://www.themoviedb.org/).
- Exemplo: `{ id: 27205, type: 'movie' }` para Inception.

## 👨‍💻 Autor
Gustavo Vieira De Matos  
[LinkedIn](https://www.linkedin.com/in/gustavo-vieira-de-matos-7stack) | [GitHub](https://github.com/gvm7stack)

---

*Desenvolvido durante a Imersão Front-End Alura.*
