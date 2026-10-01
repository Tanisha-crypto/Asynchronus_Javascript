const body = document.body;
const btn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        btn.textContent = 'Light Mode';
    }

btn.addEventListener('click', () => {
body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
            btn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
    } 
    else {
            btn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
});