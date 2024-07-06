document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (replace with proper authentication in a real application)
        if (username === 'admin' && password === 'admin123') {
            window.location.href = 'admin-dashboard.html';
        } else if (username === 'user' && password === 'user123') {
            window.location.href = 'user-dashboard.html';
        } else {
            alert('Invalid username or password');
        }
    });
});