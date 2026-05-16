document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const eyeIcon = document.getElementById('eyeIcon');

    // 1. Remember Me - Load saved username
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }

    // 2. Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update Icon (Simple toggle for demo)
        if (type === 'text') {
            eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        } else {
            eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
        }
    });

    // 3. Form Validation & Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const usernameError = document.getElementById('usernameError');
        const passwordError = document.getElementById('passwordError');

        // Reset errors
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';

        // Basic Validation
        if (usernameInput.value.trim().length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters long';
            usernameError.style.display = 'block';
            isValid = false;
        }

        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long';
            passwordError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Handle Remember Me
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedUsername', usernameInput.value);
            } else {
                localStorage.removeItem('rememberedUsername');
            }

            // Simulate API Call
            const submitBtn = loginForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;

            console.log('Logging in with:', {
                username: usernameInput.value,
                password: passwordInput.value,
                rememberMe: rememberMeCheckbox.checked
            });

            setTimeout(() => {
                alert('Login successful! (Simulated)');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
});
