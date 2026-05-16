/**
 * Unified Navbar Behaviour
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock Logic
    const updateNavClock = () => {
        const el = document.getElementById('navClock');
        if (el) {
            const now = new Date();
            el.textContent = now.toLocaleTimeString('th-TH', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    };
    setInterval(updateNavClock, 1000);
    updateNavClock();

    // 2. Active Link Logic
    // This function automatically marks the correct link as active based on current URL
    const setActiveLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && currentPath.includes(href.replace('../', ''))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    setActiveLink();
});
