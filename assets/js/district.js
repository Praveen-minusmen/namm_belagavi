// ============================================
// District Page JavaScript
// ============================================

let districtData = null;
let currentTab = 'overview';

document.addEventListener('DOMContentLoaded', function() {
    // Wait for main.js to load data
    if (window.divisionData) {
        loadDistrictPage();
    } else {
        // If main.js hasn't loaded yet, wait a bit
        setTimeout(loadDistrictPage, 200);
    }
    
    initializeTabs();
});

// ============================================
// Load District Data
// ============================================

async function loadDistrictPage() {
    // Get district name from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const districtName = urlParams.get('district');
    
    if (!districtName) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load data if not already loaded
    if (!window.divisionData) {
        try {
            const response = await fetch('data/data.json');
            window.divisionData = await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            return;
        }
    }
    
    // Find district data
    districtData = window.divisionData.belagaviDivision.districts.find(
        d => d.name.en.toLowerCase() === districtName.toLowerCase()
    );
    
    if (!districtData) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update page title
    document.getElementById('pageTitle').textContent = `${districtData.name.en} - Belagavi Division`;
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('districtBreadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = districtData.name[window.currentLanguage || 'en'];
    }
    
    // Update district name
    const districtNameEl = document.getElementById('districtName');
    if (districtNameEl) {
        districtNameEl.textContent = districtData.name[window.currentLanguage || 'en'];
    }
    
    // Load all tab content
    loadOverviewTab();
    loadHistoricalPlaces();
    loadCultureFestivals();
    loadFood();
    loadAgriculture();
    loadIndustries();
    loadSanctuaries();
    loadTourism();
}

// ============================================
// Tab Management
// ============================================

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            currentTab = tabName;
        });
    });
}

// ============================================
// Load Tab Content
// ============================================

function loadOverviewTab() {
    const lang = window.currentLanguage || 'en';
    
    // Geography
    const geographyText = document.getElementById('geographyText');
    if (geographyText) {
        geographyText.textContent = districtData.geography[lang];
    }
    
    // Notable People
    const notablePeopleContainer = document.getElementById('notablePeople');
    if (notablePeopleContainer && districtData.notablePeople) {
        notablePeopleContainer.innerHTML = '';
        
        districtData.notablePeople.forEach(person => {
            const personCard = document.createElement('div');
            personCard.className = 'notable-person';
            personCard.innerHTML = `
                <h3>${person.name[lang]}</h3>
                <p>${person.description[lang]}</p>
            `;
            notablePeopleContainer.appendChild(personCard);
        });
    }
}

function loadHistoricalPlaces() {
    const container = document.getElementById('historicalPlaces');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!districtData.historicalPlaces || districtData.historicalPlaces.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 2rem;">
            ${(window.currentLanguage || 'en') === 'en' ? 'No historical places listed.' : 'ಯಾವುದೇ ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.'}
        </p>`;
        return;
    }
    
    const lang = window.currentLanguage || 'en';
    
    districtData.historicalPlaces.forEach(place => {
        const card = createContentCard(place, lang);
        container.appendChild(card);
    });
}

function loadCultureFestivals() {
    const container = document.getElementById('cultureFestivals');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!districtData.cultureFestivals || districtData.cultureFestivals.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 2rem;">
            ${(window.currentLanguage || 'en') === 'en' ? 'No festivals listed.' : 'ಯಾವುದೇ ಉತ್ಸವಗಳು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.'}
        </p>`;
        return;
    }
    
    const lang = window.currentLanguage || 'en';
    
    districtData.cultureFestivals.forEach(festival => {
        const card = createContentCard(festival, lang);
        container.appendChild(card);
    });
}

function loadFood() {
    const container = document.getElementById('foodItems');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!districtData.food || districtData.food.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 2rem;">
            ${(window.currentLanguage || 'en') === 'en' ? 'No food items listed.' : 'ಯಾವುದೇ ಆಹಾರ ಪದಾರ್ಥಗಳು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.'}
        </p>`;
        return;
    }
    
    const lang = window.currentLanguage || 'en';
    
    districtData.food.forEach(food => {
        const card = createContentCard(food, lang);
        container.appendChild(card);
    });
}

function loadAgriculture() {
    const container = document.getElementById('agricultureItems');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!districtData.agricultureEconomy || districtData.agricultureEconomy.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 2rem;">
            ${(window.currentLanguage || 'en') === 'en' ? 'No agriculture information listed.' : 'ಯಾವುದೇ ಕೃಷಿ ಮಾಹಿತಿ ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.'}
        </p>`;
        return;
    }
    
    const lang = window.currentLanguage || 'en';
    
    districtData.agricultureEconomy.forEach(item => {
        const card = createContentCard(item, lang);
        container.appendChild(card);
    });
}

function loadIndustries() {
    const container = document.getElementById('industriesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!districtData.industries || districtData.industries.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 2rem;">
            ${(window.currentLanguage || 'en') === 'en' ? 'No industries listed.' : 'ಯಾವುದೇ ಉದ್ಯಮಗಳು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.'}
        </p>`;
        return;
    }
    
    const lang = window.currentLanguage || 'en';
    
    districtData.industries.forEach(industry => {
        const card = createContentCard(industry, lang);
        container.appendChild(card);
    });
}

function loadSanctuaries() {
    const container = document.getElementById('sanctuariesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!districtData.naturalSanctuaries || districtData.naturalSanctuaries.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 2rem;">
            ${(window.currentLanguage || 'en') === 'en' ? 'No sanctuaries listed.' : 'ಯಾವುದೇ ಅಭಯಾರಣ್ಯಗಳು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.'}
        </p>`;
        return;
    }
    
    const lang = window.currentLanguage || 'en';
    
    districtData.naturalSanctuaries.forEach(sanctuary => {
        const card = createContentCard(sanctuary, lang);
        container.appendChild(card);
    });
}

function loadTourism() {
    const container = document.getElementById('touristAttractions');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!districtData.touristAttractions || districtData.touristAttractions.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 2rem;">
            ${(window.currentLanguage || 'en') === 'en' ? 'No tourist attractions listed.' : 'ಯಾವುದೇ ಪ್ರವಾಸಿ ಆಕರ್ಷಣೆಗಳು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.'}
        </p>`;
        return;
    }
    
    const lang = window.currentLanguage || 'en';
    
    districtData.touristAttractions.forEach(attraction => {
        const card = createContentCard(attraction, lang);
        container.appendChild(card);
    });
}

// ============================================
// Helper Functions
// ============================================

function createContentCard(item, lang) {
    const card = document.createElement('div');
    card.className = 'content-card';
    
    const imageUrl = item.photo || getIconForAttraction(item.name[lang] || item.name.en);
    
    card.innerHTML = `
        <div class="content-card-image-wrapper">
            <img src="${imageUrl}" alt="${item.name[lang]}" class="content-card-image" 
                 onerror="this.onerror=null; this.parentElement.innerHTML='${getIconHTML(item.name[lang] || item.name.en)}'">
        </div>
        <div class="content-card-body">
            <h3>${item.name[lang]}</h3>
            <p>${item.description[lang]}</p>
        </div>
    `;
    
    return card;
}

function getIconForAttraction(name) {
    const nameLower = name.toLowerCase();
    
    // Temple icons
    if (nameLower.includes('temple') || nameLower.includes('ದೇವಾಲಯ') || nameLower.includes('ಮಸೀದಿ') || nameLower.includes('masjid')) {
        return 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    }
    // Fort icons
    if (nameLower.includes('fort') || nameLower.includes('ಕೋಟೆ') || nameLower.includes('buruj')) {
        return 'https://cdn-icons-png.flaticon.com/512/1995/1995515.png';
    }
    // Waterfall icons
    if (nameLower.includes('falls') || nameLower.includes('waterfall') || nameLower.includes('ಜಲಪಾತ')) {
        return 'https://cdn-icons-png.flaticon.com/512/1723/1723128.png';
    }
    // Beach icons
    if (nameLower.includes('beach') || nameLower.includes('ಬೀಚ್')) {
        return 'https://cdn-icons-png.flaticon.com/512/1723/1723125.png';
    }
    // Lake icons
    if (nameLower.includes('lake') || nameLower.includes('ಸರೋವರ') || nameLower.includes('dam') || nameLower.includes('ಧಾಮ್')) {
        return 'https://cdn-icons-png.flaticon.com/512/1723/1723130.png';
    }
    // Sanctuary/Wildlife icons
    if (nameLower.includes('sanctuary') || nameLower.includes('park') || nameLower.includes('ಅಭಯಾರಣ್ಯ') || nameLower.includes('ಉದ್ಯಾನ')) {
        return 'https://cdn-icons-png.flaticon.com/512/1723/1723129.png';
    }
    // Cave icons
    if (nameLower.includes('cave') || nameLower.includes('ಗುಹೆ') || nameLower.includes('rocks') || nameLower.includes('ಬಂಡೆ')) {
        return 'https://cdn-icons-png.flaticon.com/512/1723/1723127.png';
    }
    // Garden/Park icons
    if (nameLower.includes('garden') || nameLower.includes('park') || nameLower.includes('ಗಾರ್ಡನ್')) {
        return 'https://cdn-icons-png.flaticon.com/512/3135/3135813.png';
    }
    // Museum/Monument icons
    if (nameLower.includes('museum') || nameLower.includes('monument') || nameLower.includes('mausoleum') || nameLower.includes('rauza') || nameLower.includes('gumbaz')) {
        return 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png';
    }
    // Hill/Mountain icons
    if (nameLower.includes('hill') || nameLower.includes('mountain') || nameLower.includes('betta') || nameLower.includes('ಬೆಟ್ಟ')) {
        return 'https://cdn-icons-png.flaticon.com/512/1723/1723126.png';
    }
    // Industry/Tech icons
    if (nameLower.includes('tech') || nameLower.includes('industry') || nameLower.includes('park') || nameLower.includes('factory')) {
        return 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png';
    }
    // Default tourism icon
    return 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
}

function getIconHTML(name) {
    const iconUrl = getIconForAttraction(name);
    return `<div class="icon-fallback">
        <img src="${iconUrl}" alt="${name}" class="icon-image">
    </div>`;
}

// Update content when language changes
document.addEventListener('languageChanged', function() {
    if (districtData) {
        loadOverviewTab();
        loadHistoricalPlaces();
        loadCultureFestivals();
        loadFood();
        loadAgriculture();
        loadIndustries();
        loadSanctuaries();
        loadTourism();
        
        // Update district name
        const districtNameEl = document.getElementById('districtName');
        if (districtNameEl) {
            districtNameEl.textContent = districtData.name[window.currentLanguage || 'en'];
        }
        
        // Update breadcrumb
        const breadcrumb = document.getElementById('districtBreadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = districtData.name[window.currentLanguage || 'en'];
        }
    }
});

