// ============================================
// Gallery Page JavaScript
// ============================================

let galleryData = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to load
    if (window.divisionData) {
        loadGallery();
    } else {
        setTimeout(loadGallery, 200);
    }
    
    initializeFilters();
    initializeModal();
});

// ============================================
// Load Gallery Data
// ============================================

async function loadGallery() {
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
    
    // Collect all images from all districts
    galleryData = [];
    
    window.divisionData.belagaviDivision.districts.forEach(district => {
        const districtName = district.name.en;
        
        // Historical Places
        if (district.historicalPlaces) {
            district.historicalPlaces.forEach(place => {
                galleryData.push({
                    src: place.photo,
                    title: place.name[window.currentLanguage || 'en'],
                    description: place.description[window.currentLanguage || 'en'],
                    district: districtName,
                    category: 'historical'
                });
            });
        }
        
        // Culture & Festivals
        if (district.cultureFestivals) {
            district.cultureFestivals.forEach(festival => {
                galleryData.push({
                    src: festival.photo,
                    title: festival.name[window.currentLanguage || 'en'],
                    description: festival.description[window.currentLanguage || 'en'],
                    district: districtName,
                    category: 'festival'
                });
            });
        }
        
        // Food
        if (district.food) {
            district.food.forEach(food => {
                galleryData.push({
                    src: food.photo,
                    title: food.name[window.currentLanguage || 'en'],
                    description: food.description[window.currentLanguage || 'en'],
                    district: districtName,
                    category: 'food'
                });
            });
        }
        
        // Tourist Attractions
        if (district.touristAttractions) {
            district.touristAttractions.forEach(attraction => {
                galleryData.push({
                    src: attraction.photo,
                    title: attraction.name[window.currentLanguage || 'en'],
                    description: attraction.description[window.currentLanguage || 'en'],
                    district: districtName,
                    category: 'tourism'
                });
            });
        }
        
        // Sanctuaries
        if (district.naturalSanctuaries) {
            district.naturalSanctuaries.forEach(sanctuary => {
                galleryData.push({
                    src: sanctuary.photo,
                    title: sanctuary.name[window.currentLanguage || 'en'],
                    description: sanctuary.description[window.currentLanguage || 'en'],
                    district: districtName,
                    category: 'sanctuary'
                });
            });
        }
    });
    
    // Create filter buttons
    createFilterButtons();
    
    // Display gallery
    displayGallery();
}

// ============================================
// Filter Buttons
// ============================================

function createFilterButtons() {
    const filterContainer = document.querySelector('.gallery-filters');
    if (!filterContainer) return;
    
    // Get unique districts
    const districts = [...new Set(galleryData.map(item => item.district))];
    
    // Add district filter buttons
    districts.forEach(district => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.district = district.toLowerCase();
        btn.textContent = district;
        btn.addEventListener('click', function() {
            currentFilter = this.dataset.district;
            updateFilterButtons();
            displayGallery();
        });
        filterContainer.appendChild(btn);
    });
}

function initializeFilters() {
    const allBtn = document.querySelector('.filter-btn[data-district="all"]');
    if (allBtn) {
        allBtn.addEventListener('click', function() {
            currentFilter = 'all';
            updateFilterButtons();
            displayGallery();
        });
    }
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.district === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ============================================
// Display Gallery
// ============================================

function displayGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Filter gallery data
    const filteredData = currentFilter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.district.toLowerCase() === currentFilter);
    
    if (filteredData.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="font-size: 1.2rem; color: var(--gray);">
                    ${(window.currentLanguage || 'en') === 'en' 
                        ? 'No images found for this filter.' 
                        : 'ಈ ಫಿಲ್ಟರ್ಗೆ ಯಾವುದೇ ಚಿತ್ರಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'}
                </p>
            </div>
        `;
        return;
    }
    
    filteredData.forEach(item => {
        const galleryItem = createGalleryItem(item);
        grid.appendChild(galleryItem);
    });
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    
    div.innerHTML = `
        <img src="${item.src}" alt="${item.title}" 
             onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(item.title)}'">
        <div class="gallery-item-caption">${item.title}</div>
    `;
    
    div.addEventListener('click', function() {
        openModal(item);
    });
    
    return div;
}

// ============================================
// Modal
// ============================================

function initializeModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(item) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modal && modalImage && modalCaption) {
        modalImage.src = item.src;
        modalImage.alt = item.title;
        modalCaption.innerHTML = `
            <strong>${item.title}</strong><br>
            <em>${item.district}</em><br>
            ${item.description}
        `;
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Update gallery when language changes
document.addEventListener('languageChanged', function() {
    loadGallery();
});

