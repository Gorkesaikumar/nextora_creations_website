// Replace this with your actual WhatsApp number
const WA_PHONE = '917674981970'; // Updated to User provided number

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get Values
    // Get Values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Construct Message
    const whatsappMessage = `*New Project Inquiry* %0A
    ---------------------------%0A
    *Name:* ${name}%0A
    *Email:* ${email}%0A
    *Service:* ${service}%0A
    *Message:* ${message}%0A
    ---------------------------%0A
    Sent from Nextora Website`;

    // Redirect to WhatsApp
    const waURL = `https://wa.me/${WA_PHONE}?text=${whatsappMessage}`;
    
    // Open in new tab
    window.open(waURL, '_blank');
    
    // Optional: Reset form
    // this.reset();
});
