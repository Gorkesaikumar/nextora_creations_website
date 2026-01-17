/**
 * sheets.js
 * Handles fetching data from Google Sheets and rendering it to the DOM.
 * Mechanism: Fetches CSV data from a published Google Sheet and parses it to JSON.
 */

// CONFIGURATION: Replace with your Google Sheet ID after publishing to web
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; 
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;

// Fallback Data (For when Sheet ID is not yet connected)
const FALLBACK_DATA = {
    services: [
        { title: "Business Website + Lead System", description: "Professional 1-5 page site. Contact Form, WhatsApp button, Google Maps. <strong>Starts ₹5,000</strong>.", icon: "bi-laptop" },
        { title: "Custom Web Applications", description: "Scalable SaaS & Internal Tools. React/Django full-stack. <strong>Starts ₹25,000</strong>.", icon: "bi-code-slash" }
    ],
    portfolio: [
        { title: "E-Commerce Growth Engine", description: "Multi-vendor marketplace. Increased client sales by 40% in 3 months.", tech: "Django, React", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1964&auto=format&fit=crop" },
        { title: "Corporate Lead Magnet", description: "Professional service portal. Reduced bounce rate by 60% and doubled inquiries.", tech: "Vue, Firebase", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
        { title: "Fitness Membership App", description: "Mobile-first management system. Automates bookings, saving 10 hrs/week.", tech: "Flutter", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" }
    ],
    testimonials: [
        { name: "Simran", company: "Luxury Salon Owner", review: "I was skeptical about hiring a new agency. But Nextora delivered a site better than the one I paid ₹50k for last year. Bookings increased in week one.", stars: 5 },
        { name: "Rahul", company: "Gym Franchise Owner", review: "Speed is insane. 48 hours and we were live. The site looks premium, loads instantly, and customers actually compliment it.", stars: 5 },
        { name: "Director", company: "Apex Coaching Centre", review: "Finally an agency that talks ROI. They didn't just design; they helped structure our course pages to sell better.", stars: 5 }
    ]
};

// CSV Parser Helper
function csvToJSON(csvText) {
    const lines = csvText.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            // Remove generic quotes " if present
            let header = headers[j].trim().replace(/^"|"$/g, '');
            let value = currentline[j] ? currentline[j].trim().replace(/^"|"$/g, '') : '';
            obj[header] = value;
        }
        result.push(obj);
    }
    return result;
}


// Render Functions
function renderServices(data) {
    const container = document.getElementById('services-container');
    if (!container) return;
    
    container.innerHTML = data.map(item => `
        <div class="col-md-6 col-lg-5"> <!-- Adjusted Width for better centering -->
            <div class="glass-card h-100 text-center">
                <div class="icon-box">
                    <i class="bi ${item.icon}"></i>
                </div>
                <h4 class="mb-3">${item.title}</h4>
                <p class="text-muted small">${item.description}</p>
                <a href="https://wa.me/917674981970?text=I'm interested in ${item.title}" target="_blank" class="btn btn-link text-decoration-none text-primary fw-bold p-0 mt-2">Learn More <i class="bi bi-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

function renderPortfolio(data) {
    const container = document.getElementById('portfolio-container');
    if (!container) return; // Exit if portfolio section is removed
    
    container.innerHTML = data.map(item => `
        <div class="col-md-6 col-lg-4">
            <div class="glass-card p-4 h-100">
                <div class="portfolio-img-wrapper">
                    <img src="${item.image}" class="w-100 h-100 object-fit-cover" alt="${item.title}">
                </div>
                <div>
                    <span class="badge bg-primary bg-opacity-10 text-primary mb-2">${item.tech}</span>
                    <h5 class="fw-bold mb-2">${item.title}</h5>
                    <p class="small text-muted mb-3">${item.description}</p>
                    <a href="https://wa.me/917674981970?text=Tell me more about the project: ${item.title}" target="_blank" class="btn btn-outline-dark w-100 btn-sm rounded-pill">View Case Study</a>
                </div>
            </div>
        </div>
    `).join('');
}




function renderTestimonials(data) {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = data.map(item => `
        <div class="col-md-6 col-lg-4">
            <div class="glass-card p-4 h-100 position-relative">
                <div class="position-absolute top-0 start-0 translate-middle p-3">
                    <i class="bi bi-quote fs-1 text-primary opacity-25"></i>
                </div>
                <div class="mb-3">
                    ${Array(item.stars).fill('<i class="bi bi-star-fill text-warning small"></i>').join('')}
                </div>
                <p class="text-muted fst-italic mb-4">"${item.review}"</p>
                <div class="d-flex align-items-center">
                    <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold me-3" style="width: 40px; height: 40px;">
                        ${item.name.charAt(0)}
                    </div>
                    <div>
                        <h6 class="fw-bold mb-0">${item.name}</h6>
                        <small class="text-muted text-uppercase" style="font-size:0.75rem;">${item.company}</small>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPricing(data) {
    const container = document.getElementById('pricing-container');
    if (!container) return;
    // ... pricing logic if needed, but we are using static HTML for now.
}

// Main Fetcher
async function init() {
    // If SHEET_ID is generic, load fallback data
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
        renderServices(FALLBACK_DATA.services);
        renderPortfolio(FALLBACK_DATA.portfolio);
        renderTestimonials(FALLBACK_DATA.testimonials);
        return;
    }

    try {
        // ... fetch logic ...
        // Since we are in Setup phase, we stick to fallback to ensure UI looks good immediately.
        renderServices(FALLBACK_DATA.services);
        // renderPortfolio(FALLBACK_DATA.portfolio); // Portfolio section replaced with static content
        // renderTestimonials(FALLBACK_DATA.testimonials); // Testimonials section replaced with transparency section

    } catch (error) {
        console.error('Error fetching sheets:', error);
        // Fallback on error
        renderServices(FALLBACK_DATA.services);
        // renderPortfolio(FALLBACK_DATA.portfolio); // Portfolio section replaced with static content
        // renderTestimonials(FALLBACK_DATA.testimonials); // Testimonials section replaced with transparency section
    }
}

document.addEventListener('DOMContentLoaded', init);
