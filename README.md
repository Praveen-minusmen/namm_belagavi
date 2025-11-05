# Belagavi Division - Bilingual Information & Cultural Website

## 🌟 Overview

A comprehensive, bilingual (English + Kannada) website showcasing the history, geography, culture, literature, tourism, and agriculture of the Belagavi Division's 7 districts in Northern Karnataka.

**Vision Statement:** *"Where Geography Breathes, History Speaks, and Culture Dances."*

## 🗺️ Districts Covered

1. **Belagavi** (ಬೆಳಗಾವಿ)
2. **Dharwad** (ಧಾರವಾಡ)
3. **Gadag** (ಗದಗ)
4. **Haveri** (ಹಾವೇರಿ)
5. **Bagalkote** (ಬಾಗಲಕೋಟೆ)
6. **Vijayapura** (ವಿಜಯಪುರ)
7. **Uttara Kannada** (ಉತ್ತರ ಕನ್ನಡ)

## ✨ Features

- **Bilingual Support**: Complete English and Kannada language support with toggle
- **Interactive Map**: Leaflet.js-based map with clickable district markers
- **District Pages**: Detailed information pages with tabbed sections:
  - Overview (Geography, Notable People)
  - Historical Places
  - Culture & Festivals
  - Food
  - Agriculture
  - Industries
  - Natural Sanctuaries
  - Tourist Attractions
- **Media Gallery**: Comprehensive photo gallery with district filtering
- **Search Functionality**: Search districts by name or keyword
- **Download Features**: JSON data and PDF export options
- **Responsive Design**: Mobile-friendly design for all devices

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Map Library**: Leaflet.js
- **Fonts**: Google Fonts (Poppins for English, Noto Sans Kannada for Kannada)
- **Data Format**: JSON
- **Deployment**: Static files (compatible with Firebase Hosting, Netlify, GitHub Pages)

## 📁 Project Structure

```
belagavi-division/
├── index.html              # Home page
├── district.html            # Individual district page
├── about.html              # About page
├── gallery.html            # Media gallery page
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Main JavaScript (homepage)
│   │   ├── district.js     # District page functionality
│   │   └── gallery.js      # Gallery page functionality
│   └── images/             # Image assets (if any)
└── data/
    └── data.json           # Complete district data (bilingual)
```

## 🚀 Getting Started

### Local Development

1. **Clone or download** this project to your local machine

2. **Open the project** in a web browser:
   - Simply open `index.html` in a modern web browser
   - Or use a local server for better experience:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**:
   - Open `http://localhost:8000` in your browser

### Deployment

#### Option 1: Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

#### Option 2: Netlify
1. Drag and drop the `belagavi-division` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be live instantly!

#### Option 3: GitHub Pages
1. Push the project to a GitHub repository
2. Go to Settings > Pages
3. Select the branch and folder
4. Your site will be available at `https://username.github.io/repository-name`

## 🎨 Design Theme

The website uses a "Cultural Karnataka" theme with:
- **Terracotta** (#C85A3A): Primary color for navigation and accents
- **Gold** (#D4AF37): Hero sections and highlights
- **Green** (#2E7D32): Download sections and footer
- **Ivory** (#FFF8E1): Background color

## 📝 Data Structure

The `data/data.json` file contains all district information in a structured format:

```json
{
  "belagaviDivision": {
    "tagline": {
      "en": "...",
      "kn": "..."
    },
    "districts": [
      {
        "name": { "en": "...", "kn": "..." },
        "coordinates": { "lat": ..., "lng": ... },
        "geography": { "en": "...", "kn": "..." },
        "historicalPlaces": [...],
        "cultureFestivals": [...],
        "food": [...],
        "notablePeople": [...],
        "agricultureEconomy": [...],
        "industries": [...],
        "naturalSanctuaries": [...],
        "touristAttractions": [...]
      }
    ]
  }
}
```

## 🔧 Customization

### Adding New Districts

1. Open `data/data.json`
2. Add a new district object to the `districts` array
3. Include all required fields with bilingual content
4. Add coordinates for map marker

### Modifying Styles

- Edit `assets/css/style.css`
- Theme colors are defined in CSS variables at the top of the file
- Modify `:root` variables to change the color scheme

### Adding Features

- Main functionality: `assets/js/main.js`
- District pages: `assets/js/district.js`
- Gallery: `assets/js/gallery.js`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Features Roadmap

- [ ] Audio narration for key content
- [ ] Video integration for festivals and tourism
- [ ] Advanced filtering in gallery
- [ ] Print-friendly PDF generation
- [ ] Social media sharing
- [ ] User feedback form
- [ ] Analytics integration

## 📄 License

This project is created for educational and cultural preservation purposes.

## 🙏 Acknowledgments

- Data compiled from various sources about Belagavi Division
- Google Fonts for Kannada and English typography
- Leaflet.js for interactive maps
- OpenStreetMap for map tiles

## 📧 Contact

For inquiries, contributions, or feedback, please reach out through appropriate channels.

---

**Built with ❤️ for Karnataka's Cultural Heritage**

