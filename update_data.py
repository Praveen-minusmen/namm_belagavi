#!/usr/bin/env python3
"""
Script to merge new district data into existing bilingual data.json
"""
import json

# New data provided by user (simplified structure)
new_data = {
    "Haveri": {
        "tagline": "From plains to hills — Haveri's legacy thrives through history and culture.",
        "geography": "Central Karnataka plains; rivers: Varada, Tungabhadra tributaries.",
        "historicalPlaces": ["Ranebennur Blackbuck Sanctuary"],
        "cultureFestivals": ["Dollu Kunitha, Local jatres, Byadgi chili festival"],
        "folkDances": ["Suggi Kunita"],
        "notablePersonalities": ["Gangubai Hangal — Hindustani vocalist"],
        "food": ["Byadgi Chili", "Jolada Rotti", "Holige"],
        "agricultureEconomy": ["Chili", "Jowar", "Cotton", "Maize", "Coconut"],
        "industries": ["Agricultural processing"],
        "naturalSanctuaries": ["Ranebennur Blackbuck Sanctuary"],
        "touristAttractions": ["Byadgi", "Ranebennur Blackbuck Sanctuary"]
    },
    "Bagalkote": {
        "tagline": "The soil that gave warriors and wisdom to the world.",
        "geography": "Northern Karnataka plains; rivers: Krishna, Ghataprabha.",
        "historicalPlaces": ["Badami Fort", "Badami Cave Temples", "Pattadakal", "Aihole", "Kudalasangama"],
        "cultureFestivals": ["Dollu Kunitha, Veeragase, Temple festivals"],
        "folkDances": ["Veeragase"],
        "notablePersonalities": ["Basavanna (via Kudalasangama)"],
        "food": ["Jolada Rotti", "Karadantu", "Holige"],
        "agricultureEconomy": ["Sugarcane", "Cotton", "Jowar", "Pulses"],
        "industries": ["Sugar factories"],
        "naturalSanctuaries": ["Ghataprabha Bird Sanctuary"],
        "touristAttractions": ["Badami Cave Temples", "Pattadakal", "Aihole", "Kudalasangama"]
    },
    "Vijayapura": {
        "tagline": "Where forts speak, and history lives on.",
        "geography": "Deccan Plateau; semi-arid; rivers: Bhima, Doni.",
        "historicalPlaces": ["Gol Gumbaz", "Ibrahim Rauza", "Bijapur Fort", "Jama Masjid"],
        "cultureFestivals": ["Classical music, Qawwali, Sufi festivals"],
        "folkDances": ["Regional folk dances from northern Karnataka"],
        "notablePersonalities": ["Sultan Mohammed Adil Shah — Patron of arts"],
        "food": ["Biryani", "Kebabs", "Jolada Rotti"],
        "agricultureEconomy": ["Jowar", "Sugarcane", "Groundnut", "Maize"],
        "industries": ["Local artisan crafts, Historical tourism"],
        "naturalSanctuaries": [],
        "touristAttractions": ["Gol Gumbaz", "Ibrahim Rauza", "Bijapur Fort", "Barakaman"]
    },
    "Uttara Kannada": {
        "tagline": "From hills to coasts — Belagavi Division breathes geography, culture, and grace.",
        "geography": "Western Ghats, Arabian Sea coast, rivers: Kali, Gangavali, Sharavathi. Tropical climate; heavy rainfall.",
        "historicalPlaces": ["Mirjan Fort", "Syntheri Rocks (ಸಿಂಥೇರಿ ಬಂಡೆಕಲ್ಲು)", "Dandeli", "Sirsi Marikamba Festival site"],
        "cultureFestivals": ["Yakshagana, Dollu Kunitha, Siddi Dhamal, Sirsi Marikamba, Karavali Utsav"],
        "folkDances": ["Siddi Dhamal", "Dollu Kunita"],
        "notablePersonalities": ["Shivarama Karantha — Writer, environmentalist", "Raghunath Krishna Karanth — Linguist"],
        "food": ["Kori Rotti", "Fish Curry", "Holige"],
        "agricultureEconomy": ["Rice", "Cashew", "Coconut", "Arecanut", "Spices"],
        "industries": ["Eco-tourism, Fisheries"],
        "naturalSanctuaries": ["Jog Falls", "Anshi National Park & Kali Tiger Reserve", "Attiveri Bird Sanctuary"],
        "touristAttractions": ["Jog Falls", "Mirjan Fort", "Syntheri Rocks", "Karwar Beaches", "Dandeli"]
    },
    "Belagavi": {
        "tagline": "The soil that gave warriors and wisdom to the world.",
        "geography": "Located in Northern Karnataka; part of Western Ghats & Bayalu Seeme transition zone. Rivers: Malaprabha, Ghataprabha. Climate: Moderate; monsoon July–Sept; fertile black soil.",
        "historicalPlaces": ["Kittur Fort — Rani Chennamma's resistance", "Belagavi Fort — Chalukya & Maratha era", "Savdatti Yellamma Temple — pilgrimage & fairs"],
        "cultureFestivals": ["Folk arts: Veeragase, Dollu Kunitha, Suggi Kunita", "Festivals: Kittur Utsava, Ugadi, Deepavali"],
        "folkDances": ["Veeragase", "Suggi Kunita", "Siddi Dhamal"],
        "notablePersonalities": ["V. K. Gokak — Poet & scholar", "Chandrashekhara Kambar — Poet & playwright"],
        "food": ["Belagavi Kunda", "Mandige", "Jolada Rotti"],
        "agricultureEconomy": ["Sugarcane", "Maize", "Jowar", "Pulses"],
        "industries": ["Krishna Sugar Factory"],
        "naturalSanctuaries": ["Bhimgad Sanctuary", "Gattaprabha Bird Sanctuary"],
        "touristAttractions": ["Kittur Fort", "Belagavi Fort", "Savdatti Yellamma Temple"]
    },
    "Dharwad": {
        "tagline": "Every drumbeat echoes the heart of Karnataka.",
        "geography": "Malaprabha & Varada rivers; plateau region. Moderate climate; fertile red soil.",
        "historicalPlaces": ["Western Chalukya monuments", "Temples at Unkal, Hubli"],
        "cultureFestivals": ["Hindustani music, Dollu Kunitha", "Festivals: Unkal Lake events, Sangeet Utsav"],
        "folkDances": ["Dollu Kunita", "Kolata"],
        "notablePersonalities": ["Da. Ra. Bendre — Poet", "Bhimsen Joshi — Hindustani vocalist"],
        "food": ["Dharwad Peda", "Jolada Rotti"],
        "agricultureEconomy": ["Cotton", "Jowar", "Pulses"],
        "industries": ["Tech Park Hubli"],
        "naturalSanctuaries": ["Attiveri Bird Sanctuary (border with Uttara Kannada)"],
        "touristAttractions": ["Unkal Lake", "Sadhankeri Park", "Murugha Matha"]
    },
    "Gadag": {
        "tagline": "The soil that gave warriors and wisdom to the world.",
        "geography": "Bayalu Seeme plains; dry deciduous forests.",
        "historicalPlaces": ["Trikuteshwara Temple", "Lakkundi Stepwells"],
        "cultureFestivals": ["Veeragase, Dollu Kunitha, Suggi Kunita, Local jatres & temple festivals"],
        "folkDances": ["Dollu Kunita", "Suggi Kunita"],
        "notablePersonalities": ["Puttaraja Gavayi — Musician"],
        "food": ["Jolada Rotti", "Holige", "Karadantu"],
        "agricultureEconomy": ["Jowar", "Cotton", "Maize", "Pulses"],
        "industries": ["Local handloom & crafts"],
        "naturalSanctuaries": [],
        "touristAttractions": ["Trikuteshwara Temple", "Lakkundi", "Dambal"]
    }
}

print("New data structure prepared. Use this to update data.json manually or via script.")

