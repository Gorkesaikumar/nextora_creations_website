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
        { title: "Website Design", description: "Premium, responsive designs. <strong>FREE OF COST</strong> (Launch Offer).", icon: "bi-palette" },
        { title: "Web Applications", description: "Scalable custom apps (React/Django). <strong>Starting at ₹25,000</strong>.", icon: "bi-code-slash" }
    ],
    portfolio: [
        { title: "E-Commerce Platform", description: "A scalable multi-vendor marketplace.", tech: "Django, React", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1964&auto=format&fit=crop" },
        { title: "Corporate Portal", description: "Internal management system.", tech: "Vue, Firebase", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
        { title: "Fitness App", description: "Mobile app for tracking workouts.", tech: "Flutter", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" }
    ],
    testimonials: [
        { name: "Rajesh Kumar", company: "Alpha Traders", review: "Nextora transformed our digital presence. Highly recommended!", stars: 5 },
        { name: "Sarah Jenkins", company: "TechFlow", review: "Professional team with great attention to detail.", stars: 5 },
        { name: "Amit Patel", company: "StartGood", review: "Delivered on time and exceeded expectations.", stars: 4 }
    ],
    pricing: [
        { name: "Launch Offer", price: "FREE", features: ["5 Page Website", "Contact Form", "Mobile Responsive", "Client buys Domain/Hosting"] },
        { name: "Web Application", price: "Contact Me", features: ["Contact for requirements and features"] }
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



function renderPricing(data) {
    const container = document.getElementById('pricing-container');
    if (!container) return;

    container.innerHTML = data.map(item => `
        <div class="col-md-4">
            <div class="glass-card h-100 text-center">
                <h4 class="fw-bold text-muted text-uppercase small letter-spacing-2 mb-3">${item.name}</h4>
                <h2 class="display-4 fw-bold text-dark my-2">${item.price}</h2>
                <hr class="my-4 opacity-10">
                <ul class="list-unstyled mb-5 text-start">
                    ${Array.isArray(item.features) 
                        ? item.features.map(f => `<li class="mb-3 d-flex align-items-center"><i class="bi bi-check-circle-fill text-primary me-2"></i> <span class="text-muted">${f}</span></li>`).join('') 
                        : `<li class="mb-3 d-flex align-items-center"><i class="bi bi-check-circle-fill text-primary me-2"></i> <span class="text-muted">${item.features}</span></li>`
                    }
                </ul>
                <a href="https://wa.me/917674981970?text=I'm interested in the ${item.name} plan" target="_blank" class="btn btn-primary-gradient w-100">Choose Plan</a>
            </div>
        </div>
    `).join('');
}

// Main Fetcher
async function init() {
    // If SHEET_ID is generic, load fallback data
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
        console.warn('Google Sheet ID not set. Loading fallback data.');
        renderServices(FALLBACK_DATA.services);
        renderPortfolio(FALLBACK_DATA.portfolio);
        // renderTestimonials removed
        // renderPricing removed (static)
        return;
    }

    try {
        // Example of how you would fetch specific sheets
        // Note: You need to know the specific Sheet Name (tab name) for this to work with 'sheet=' param
        /* 
        const services = await fetch(BASE_URL + 'Services').then(r => r.text()).then(csvToJSON);
        renderServices(services);
        */
        
        // Since we are in Setup phase, we stick to fallback to ensure UI looks good immediately.
        renderServices(FALLBACK_DATA.services);
        renderPortfolio(FALLBACK_DATA.portfolio);

    } catch (error) {
        console.error('Error fetching sheets:', error);
        // Fallback on error
        renderServices(FALLBACK_DATA.services);
        renderPortfolio(FALLBACK_DATA.portfolio);
    }
}

document.addEventListener('DOMContentLoaded', init);
