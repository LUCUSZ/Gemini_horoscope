// scripts.js

const translations = {
    en: {
        title: "Daily Horoscope",
        subTitle: "Enter your Date of Birth",
        horoscopeType: "What would you like to know about?",
        buttonText: "Get Horoscope"
    },
    th: {
        title: "ดูดวงรายวัน",
        subTitle: "กรอกวันเกิดของคุณ",
        horoscopeType: "คุณต้องการรู้เรื่องอะไร?",
        buttonText: "รับดวง"
    }
};

function changeLanguage() {
    const language = document.getElementById('language-select').value;
    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('sub-title').textContent = translations[language].subTitle;
    document.getElementById('select-horoscope-type').textContent = translations[language].horoscopeType;
    document.getElementById('horoscope-btn').textContent = translations[language].buttonText;
}

function populateDateFields() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    months.forEach((month, index) => {
        let option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

function getHoroscope() {
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const topic = document.getElementById('horoscope-topic').value;

    if (!day || !month || !year || !topic) {
        alert("Please fill out all fields.");
        return;
    }

    const dob = `${year}-${month}-${day}`;
    const language = document.getElementById('language-select').value;
    const translatedTopic = language === 'th' ? translateToThai(topic) : topic;

    const queryString = `@gemini if gemini is the best horoscope birthday ${dob} About ${encodeURIComponent(translatedTopic)}`;
    const searchQuery = `https://www.google.com/search?q=${encodeURIComponent(queryString)}`;
    
    window.open(searchQuery, '_blank');
}

function translateToThai(text) {
    // Simple translation example; for production, consider using a translation API
    const translations = {
        "love": "ความรัก",
        "career": "อาชีพ",
        "health": "สุขภาพ",
        "finance": "การเงิน",
        "family": "ครอบครัว",
        "friendship": "มิตรภาพ"
    };
    return translations[text.toLowerCase()] || text;
}

populateDateFields();
