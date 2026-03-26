const body = document.body;
const themeToggle = document.getElementById('themeToggle');

const setTheme = (theme) => {
    if (theme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeToggle.textContent = '☾';
        themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
        themeToggle.setAttribute('aria-pressed', 'false');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeToggle.textContent = '☀';
        themeToggle.setAttribute('aria-label', 'Ativar modo claro');
        themeToggle.setAttribute('aria-pressed', 'true');
    }
    localStorage.setItem('netflixTheme', theme);
};

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('netflixTheme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));