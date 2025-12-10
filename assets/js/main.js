// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.classList.remove('shadow-sm');
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
    }
});

// Update Navbar Top Position based on Notification Bar (since both are fixed)
const notificationBar = document.querySelector('.notification-bar');
const navbar = document.querySelector('.navbar');

function adjustNavbar() {
    if(notificationBar) {
        navbar.style.top = notificationBar.offsetHeight + 'px';
    }
}
window.addEventListener('resize', adjustNavbar);
window.addEventListener('load', adjustNavbar);
adjustNavbar();

// Recurring Offer Popup (Every 30 Seconds)
// Note: In production, you might want to use localStorage to not annoy users too much.
// But as per specific request "every 30 seconds":
setTimeout(() => {
    // Initial triggering after 30s
    showOfferModal();
    
    // Then every 30s
    setInterval(showOfferModal, 30000); 
}, 30000);

function showOfferModal() {
    const offerModalElement = document.getElementById('offerModal');
    if (offerModalElement) {
        // Check if modal is already shown to avoid overlapping backdrops or errors
        if (!offerModalElement.classList.contains('show')) {
            const offerModal = new bootstrap.Modal(offerModalElement);
            offerModal.show();
        }
    }
}
// Smooth Scroll for Anchor Links (if not natively supported by browser)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }

            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});
