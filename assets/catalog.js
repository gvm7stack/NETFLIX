// Chave da API do TMDB (pública para uso educacional)
const TMDB_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMG = 'https://image.tmdb.org/t/p/w300';
const TMDB_IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

// Configuração de cada perfil com suas categorias e filmes escolhidos
const profileConfig = {
    gustavo: {
        name: 'Gustavo',
        img: 'assets/perfil1.jpg',
        categories: [
            {
                name: 'Assistidos recentemente',
                movies: [
                    { id: 27205, type: 'movie' },
                    { id: 60574, type: 'tv' },
                    { id: 603, type: 'movie' }
                ]
            },
            {
                name: 'Séries que curto',
                movies: [
                    { id: 1396, type: 'tv' },
                    { id: 1399, type: 'tv' }
                ]
            }
        ]
    },
    rafaela: {
        name: 'Rafaela',
        img: 'assets/perfil2.jpg',
        categories: [
            {
                name: 'Drama e Inspiração',
                movies: [
                    { id: 550, type: 'movie' },
                    { id: 157336, type: 'movie' },
                    { id: 44217, type: 'movie' }
                ]
            },
            {
                name: 'Séries de Mistério',
                movies: [
                    { id: 1399, type: 'tv' },
                    { id: 66732, type: 'tv' },
                    { id: 73767, type: 'tv' }
                ]
            }
        ]
    },
    davi: {
        name: 'Davi',
        img: 'assets/perfil3.jpg',
        categories: [
            {
                name: 'Ação e Aventura',
                movies: [
                    { id: 299536, type: 'movie' },
                    { id: 27205, type: 'movie' },
                    { id: 1920, type: 'tv' }
                ]
            },
            {
                name: 'Sci-Fi',
                movies: [
                    { id: 603, type: 'movie' },
                    { id: 11, type: 'movie' },
                    { id: 1402, type: 'movie' }
                ]
            }
        ]
    },
    meg: {
        name: 'Meg',
        img: 'assets/perfil4.jpg',
        categories: [
            {
                name: 'Comédia',
                movies: [
                    { id: 399566, type: 'movie' },
                    { id: 166428, type: 'movie' },
                    { id: 496243, type: 'movie' }
                ]
            },
            {
                name: 'Séries Leves',
                movies: [
                    { id: 60625, type: 'tv' },
                    { id: 66732, type: 'tv' },
                    { id: 62884, type: 'tv' }
                ]
            }
        ]
    }
};

// Busca detalhes de um filme ou série
async function fetchMovieDetails(id, type) {
    const url = `${TMDB_BASE}/${type}/${id}?api_key=${TMDB_KEY}&language=pt-BR`;
    const res = await fetch(url);
    const data = await res.json();
    return { ...data, mediaType: type };
}

// Busca o trailer de um filme ou série
async function fetchTrailer(id, type) {
    const url = `${TMDB_BASE}/${type}/${id}/videos?api_key=${TMDB_KEY}&language=pt-BR`;
    const res = await fetch(url);
    const data = await res.json();

    let trailer = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');

    if (!trailer) {
        const urlEn = `${TMDB_BASE}/${type}/${id}/videos?api_key=${TMDB_KEY}&language=en-US`;
        const resEn = await fetch(urlEn);
        const dataEn = await resEn.json();
        trailer = dataEn.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    }

    return trailer ? trailer.key : null;
}

// Entra no perfil selecionado
async function enterProfile(profileKey) {
    const profile = profileConfig[profileKey];

    document.getElementById('currentProfileName').textContent = profile.name;
    document.getElementById('currentProfileImg').src = profile.img;

    document.getElementById('profilesScreen').classList.add('hidden');
    document.getElementById('catalogScreen').classList.remove('hidden');

    await loadCatalog(profile);
}

// Volta para tela de perfis
function backToProfiles() {
    closeTrailer();
    document.getElementById('catalogScreen').classList.add('hidden');
    document.getElementById('profilesScreen').classList.remove('hidden');
    document.getElementById('catalogContent').innerHTML = '<p class="loading-text">Carregando catálogo...</p>';
}

// Carrega todo o catálogo do perfil
async function loadCatalog(profile) {
    const catalogEl = document.getElementById('catalogContent');
    catalogEl.innerHTML = '<p class="loading-text">Carregando catálogo...</p>';

    try {
        const allResults = await Promise.all(
            profile.categories.map(cat =>
                Promise.all(cat.movies.map(movie => fetchMovieDetails(movie.id, movie.type)))
            )
        );

        // Banner com o primeiro filme
        const bannerMovie = allResults[0][0];
        if (bannerMovie) {
            document.getElementById('bannerTitle').textContent = bannerMovie.title || bannerMovie.name;
            document.getElementById('bannerDesc').textContent = (bannerMovie.overview?.slice(0, 150) || '') + '...';
            document.getElementById('bannerSection').style.backgroundImage =
                `linear-gradient(to right, rgba(0,0,0,0.8) 40%, transparent), url(${TMDB_IMG_ORIGINAL}${bannerMovie.backdrop_path})`;

            // Botão assistir do banner
            document.getElementById('bannerPlayBtn').onclick = () =>
                openTrailer(bannerMovie.id, bannerMovie.mediaType);
        }

        // Monta as categorias
        catalogEl.innerHTML = '';
        profile.categories.forEach((cat, index) => {
            const movies = allResults[index];
            if (!movies.length) return;

            const section = document.createElement('section');
            section.classList.add('category');
            section.innerHTML = `
                <h3 class="category-title">${cat.name}</h3>
                <div class="movies-row">
                    ${movies.map(movie => `
                        <div class="movie-card" title="${movie.title || movie.name}"
                             onclick="openTrailer(${movie.id}, '${movie.mediaType}')">
                            <img
                                src="${movie.poster_path
                                    ? TMDB_IMG + movie.poster_path
                                    : 'https://via.placeholder.com/200x300/1a1a1a/ffffff?text=' + encodeURIComponent(movie.title || movie.name)}"
                                alt="${movie.title || movie.name}"
                                loading="lazy"
                            >
                            <div class="movie-info">
                                <p class="movie-title">${movie.title || movie.name}</p>
                                <p class="movie-rating">⭐ ${movie.vote_average?.toFixed(1)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            catalogEl.appendChild(section);
        });

    } catch (err) {
        catalogEl.innerHTML = '<p class="loading-text">Erro ao carregar catálogo. Verifique sua conexão.</p>';
        console.error(err);
    }
}

// Abre o player de trailer estilo Netflix (sobe de baixo)
async function openTrailer(id, type) {
    const key = await fetchTrailer(id, type);

    if (!key) {
        alert('Trailer não disponível para este título.');
        return;
    }

    const player = document.getElementById('trailerPlayer');
    const frame = document.getElementById('trailerFrame');

    frame.src = `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;

    player.classList.remove('hidden', 'slide-down');
    player.classList.add('slide-up');
}

// Fecha o player com animação de descer
function closeTrailer() {
    const player = document.getElementById('trailerPlayer');
    const frame = document.getElementById('trailerFrame');

    player.classList.remove('slide-up');
    player.classList.add('slide-down');

    setTimeout(() => {
        player.classList.add('hidden');
        frame.src = '';
    }, 400);
}

// Fecha com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTrailer();
});