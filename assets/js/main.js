// ============================================
// Main JavaScript for Belagavi Division Website
// ============================================

let currentLanguage = 'en';
let divisionData = null;

// Make variables globally accessible
window.currentLanguage = currentLanguage;
window.divisionData = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    loadData();
    initializeMobileMenu();
    
    // Initialize map if on index page
    if (document.getElementById('map')) {
        initializeMap();
    }
    
    // Initialize districts grid if on index page
    if (document.getElementById('districtsGrid')) {
        loadDistricts();
    }
    
    // Initialize posters section if on index page
    if (document.getElementById('postersGrid')) {
        loadPosters();
    }
    
    // Initialize search if present
    if (document.getElementById('searchBtn')) {
        initializeSearch();
    }
    
    // Initialize downloads if present
    if (document.getElementById('downloadJson')) {
        initializeDownloads();
    }
});

// ============================================
// Language Toggle Functionality
// ============================================

function initializeLanguage() {
    // Get saved language preference or default to English
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    currentLanguage = savedLang;
    
    // Set active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update all content
    updateLanguage();
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentLanguage = this.dataset.lang;
            localStorage.setItem('preferredLanguage', currentLanguage);
            
            // Update active button
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update content
            updateLanguage();
            
            // Re-initialize map if present (to update markers)
            if (document.getElementById('map')) {
                initializeMap();
            }
        });
    });
}

function updateLanguage() {
    // Use requestAnimationFrame to prevent flickering
    requestAnimationFrame(() => {
        // Add/remove kannada class to body
        if (currentLanguage === 'kn') {
            document.body.classList.add('kannada');
        } else {
            document.body.classList.remove('kannada');
        }
        
        // Set global variable for other scripts
        window.currentLanguage = currentLanguage;
        
        // Batch DOM updates to prevent flickering
        const elementsToUpdate = document.querySelectorAll('[data-en][data-kn]');
        const fragment = document.createDocumentFragment();
        
        // Update all elements with data-en and data-kn attributes
        elementsToUpdate.forEach(element => {
            const text = currentLanguage === 'en' ? element.dataset.en : element.dataset.kn;
            
            // Handle placeholders
            if (element.tagName === 'INPUT') {
                const placeholder = currentLanguage === 'en' ? element.dataset.enPlaceholder : element.dataset.knPlaceholder;
                if (placeholder) {
                    element.placeholder = placeholder;
                }
            } else {
                // Use textContent for instant update without flicker
                element.textContent = text;
            }
        });
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLanguage } }));
    });
}

// ============================================
// Data Loading
// ============================================

async function loadData() {
    try {
        const response = await fetch('data/data.json');
        divisionData = await response.json();
        window.divisionData = divisionData; // Make globally accessible
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ============================================
// Map Initialization (Leaflet)
// ============================================

function initializeMap() {
    if (!divisionData) {
        setTimeout(initializeMap, 100);
        return;
    }
    
    // Initialize map centered on Belagavi Division
    const map = L.map('map').setView([15.5, 75.0], 7);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Add markers for each district
    divisionData.belagaviDivision.districts.forEach(district => {
        const marker = L.marker([district.coordinates.lat, district.coordinates.lng])
            .addTo(map)
            .bindPopup(`
                <strong>${district.name[currentLanguage]}</strong><br>
                <a href="district.html?district=${encodeURIComponent(district.name.en)}" style="color: #C85A3A; text-decoration: none;">
                    ${currentLanguage === 'en' ? 'Explore' : 'ಅನ್ವೇಷಿಸಿ'}
                </a>
            `);
        
        marker.on('click', function() {
            window.location.href = `district.html?district=${encodeURIComponent(district.name.en)}`;
        });
    });
}

// ============================================
// Districts Grid
// ============================================

function loadDistricts() {
    if (!divisionData) {
        setTimeout(loadDistricts, 100);
        return;
    }
    
    const grid = document.getElementById('districtsGrid');
    grid.innerHTML = '';
    
    divisionData.belagaviDivision.districts.forEach(district => {
        const card = createDistrictCard(district);
        grid.appendChild(card);
    });
}

function createDistrictCard(district) {
    const card = document.createElement('a');
    card.href = `district.html?district=${encodeURIComponent(district.name.en)}`;
    card.className = 'district-card';
    
    // Get image - prioritize mainPhoto, then fallback to historical places or tourist attractions
    let imageUrl = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(district.name.en);
    if (district.mainPhoto) {
        imageUrl = district.mainPhoto;
    } else if (district.historicalPlaces && district.historicalPlaces.length > 0) {
        imageUrl = district.historicalPlaces[0].photo;
    } else if (district.touristAttractions && district.touristAttractions.length > 0) {
        imageUrl = district.touristAttractions[0].photo;
    }
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${district.name[currentLanguage]}" class="district-card-image" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(district.name.en)}'">
        <div class="district-card-content">
            <h3>${district.name[currentLanguage]}</h3>
            <p>${district.geography[currentLanguage].substring(0, 150)}...</p>
        </div>
    `;
    
    return card;
}

// ============================================
// Posters Section
// ============================================

function loadPosters() {
    const grid = document.getElementById('postersGrid');
    if (!grid) return;
    
    // List of poster images in the posters folder
    const posterImages = [
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.37 AM.jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.38 AM (1).jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.38 AM.jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.39 AM (1).jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.39 AM (2).jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.39 AM.jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.40 AM (1).jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.40 AM.jpeg',
        'assets/images/posters/WhatsApp Image 2025-11-05 at 12.27.41 AM.jpeg'
    ];
    
    grid.innerHTML = '';
    
    posterImages.forEach((imagePath, index) => {
        const posterItem = createPosterItem(imagePath, index);
        grid.appendChild(posterItem);
    });
}

function createPosterItem(imagePath, index) {
    const div = document.createElement('div');
    div.className = 'poster-item';
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = `Cultural Poster ${index + 1}`;
    img.loading = 'lazy'; // Lazy loading for better performance
    
    // Add error handling
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x600?text=Poster+' + (index + 1);
    };
    
    // Add click event to open in modal or full view
    div.addEventListener('click', function() {
        openPosterModal(imagePath, index + 1);
    });
    
    div.appendChild(img);
    return div;
}

function openPosterModal(imagePath, posterNumber) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('posterModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'posterModal';
        modal.className = 'poster-modal';
        modal.innerHTML = `
            <span class="close-poster-modal">&times;</span>
            <img class="poster-modal-content" id="posterModalImage">
            <div class="poster-modal-caption">Poster ${posterNumber}</div>
        `;
        document.body.appendChild(modal);
        
        // Close modal on X click
        modal.querySelector('.close-poster-modal').addEventListener('click', closePosterModal);
        
        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePosterModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closePosterModal();
            }
        });
    }
    
    // Show modal with image
    const modalImage = document.getElementById('posterModalImage');
    const modalCaption = modal.querySelector('.poster-modal-caption');
    
    if (modalImage) {
        modalImage.src = imagePath;
        modalImage.alt = `Cultural Poster ${posterNumber}`;
    }
    
    if (modalCaption) {
        modalCaption.textContent = `Cultural Poster ${posterNumber}`;
    }
    
    modal.style.display = 'block';
}

function closePosterModal() {
    const modal = document.getElementById('posterModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ============================================
// Search Functionality
// ============================================

function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        loadDistricts();
        return;
    }
    
    if (!divisionData) {
        setTimeout(performSearch, 100);
        return;
    }
    
    const grid = document.getElementById('districtsGrid');
    grid.innerHTML = '';
    
    const filteredDistricts = divisionData.belagaviDivision.districts.filter(district => {
        const nameEn = district.name.en.toLowerCase();
        const nameKn = district.name.kn.toLowerCase();
        const geography = district.geography[currentLanguage].toLowerCase();
        
        return nameEn.includes(query) || nameKn.includes(query) || geography.includes(query);
    });
    
    if (filteredDistricts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="font-size: 1.2rem; color: var(--gray);">
                    ${currentLanguage === 'en' ? 'No districts found matching your search.' : 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಜಿಲ್ಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'}
                </p>
            </div>
        `;
        return;
    }
    
    filteredDistricts.forEach(district => {
        const card = createDistrictCard(district);
        grid.appendChild(card);
    });
}

// ============================================
// Download Functionality
// ============================================

function initializeDownloads() {
    const downloadJson = document.getElementById('downloadJson');
    const downloadPdf = document.getElementById('downloadPdf');
    
    if (downloadJson) {
        downloadJson.addEventListener('click', function() {
            downloadJSON();
        });
    }
    
    if (downloadPdf) {
        downloadPdf.addEventListener('click', function() {
            downloadPDF();
        });
    }
}

function downloadJSON() {
    if (!divisionData) {
        alert(currentLanguage === 'en' ? 'Data not loaded yet. Please wait.' : 'ಡೇಟಾ ಇನ್ನೂ ಲೋಡ್ ಆಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ.');
        return;
    }
    
    const dataStr = JSON.stringify(divisionData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'belagavi-division-data.json';
    link.click();
    URL.revokeObjectURL(url);
}

function downloadPDF() {
    // For now, create a simple PDF or redirect
    // In production, you would use a library like jsPDF or generate server-side
    alert(currentLanguage === 'en' 
        ? 'PDF download feature coming soon. For now, you can use the JSON data.' 
        : 'PDF ಡೌನ್ಲೋಡ್ ವೈಶಿಷ್ಟ್ಯವು ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತದೆ. ಈಗ, ನೀವು JSON ಡೇಟಾವನ್ನು ಬಳಸಬಹುದು.');
    
    // Alternative: Generate a simple HTML version that can be printed as PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generatePDFHTML());
    printWindow.document.close();
    printWindow.print();
}

function generatePDFHTML() {
    if (!divisionData) return '';
    
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Belagavi Division - Bilingual Guide</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #C85A3A; }
                h2 { color: #D4AF37; margin-top: 30px; }
                .district { margin-bottom: 40px; page-break-inside: avoid; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #C85A3A; color: white; }
            </style>
        </head>
        <body>
            <h1>Belagavi Division - Bilingual Guide</h1>
            <p><strong>${divisionData.belagaviDivision.tagline.en}</strong></p>
            <p><strong>${divisionData.belagaviDivision.tagline.kn}</strong></p>
    `;
    
    divisionData.belagaviDivision.districts.forEach(district => {
        html += `
            <div class="district">
                <h2>${district.name.en} / ${district.name.kn}</h2>
                <p><strong>Geography:</strong> ${district.geography.en}</p>
                <p><strong>ಭೂಗೋಳ:</strong> ${district.geography.kn}</p>
            </div>
        `;
    });
    
    html += '</body></html>';
    return html;
}

// ============================================
// Mobile Menu
// ============================================

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

