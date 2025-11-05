# Quick Start Guide

## 🚀 Quick Setup

### Option 1: Open Directly (Simplest)
1. Navigate to the `belagavi-division` folder
2. Double-click `index.html`
3. Website opens in your default browser

### Option 2: Local Server (Recommended)
```bash
# Navigate to belagavi-division folder
cd belagavi-division

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have it installed)
npx http-server

# PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

## 📋 Features to Try

1. **Language Toggle**: Click "EN" or "ಕನ್ನಡ" buttons in the navigation
2. **Interactive Map**: Click on district markers to navigate to district pages
3. **District Cards**: Click any district card on the homepage
4. **Search**: Use the search box to find districts by name
5. **Tabs**: Explore different sections on district pages (Overview, Places, Culture, etc.)
6. **Gallery**: View all images with district filtering
7. **Downloads**: Download JSON data or generate PDF

## 🎯 Key Pages

- **Home** (`index.html`): Overview with map and district cards
- **District** (`district.html?district=Belagavi`): Detailed district information
- **Gallery** (`gallery.html`): Media gallery with filters
- **About** (`about.html`): Project information and vision

## 🔧 Troubleshooting

### Map not showing?
- Check internet connection (requires OpenStreetMap tiles)
- Ensure Leaflet.js CDN is accessible

### Images not loading?
- Placeholder images are used from via.placeholder.com
- Replace with actual images in `data/data.json`

### Language not switching?
- Clear browser cache
- Check browser console for JavaScript errors

## 📝 Notes

- All data is stored in `data/data.json`
- To modify content, edit the JSON file
- CSS variables in `assets/css/style.css` can be customized for colors
- The website works offline except for map tiles and placeholder images

## 🌐 Deployment

### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

### Netlify
- Drag and drop the folder to Netlify Drop
- Or connect GitHub repository

### GitHub Pages
- Push to GitHub
- Enable Pages in repository settings

---

**Happy Exploring! 🎉**

