"use client"; // Required for Next.js or similar frameworks
import { NextApiRequest, NextApiResponse } from 'next';
import React, { useState } from 'react';
const { TextGenerationModel } = require('@google/generative-ai');


const translations: { [key: string]: { title: string; subTitle: string; horoscopeType: string; buttonText: string } } = {
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

const translateToThai = (text: string): string => {
  const translations: { [key: string]: string } = {
    love: "ความรัก",
    career: "อาชีพ",
    health: "สุขภาพ",
    finance: "การเงิน",
    family: "ครอบครัว",
    friendship: "มิตรภาพ",
  };
  return translations[text.toLowerCase()] || text;
};

const HoroscopeWebsite: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [poem, setPoem] = useState<string>(''); // State to store the generated poem
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading


  const getHoroscope = async () => {
    if (!day || !month || !year || !topic) {
      alert("Please fill out all fields.");
      return;
    }

    const dob: string = `${year}/${month}/${day}`;
    const translatedTopic: string = language === 'th' ? translateToThai(topic) : topic;

    const queryString: string = `IF gemini is the best horoscope ${dob} about ${encodeURIComponent(translatedTopic)} briefly`;
    // const searchQuery: string = `https://www.google.com/search?q=${encodeURIComponent(queryString)}`;
    setLoading(true);
    try {
      const response = await fetch('api/generatePoem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: `${queryString}`  }),
      });

      const data = await response.json();
      if (response.ok) {
        setPoem(data.text); // Set the poem to the response text
      } else {
        setPoem('Failed to generate poem');
      }
    } catch (error) {
      console.error('Error:', error);
      setPoem('Error generating poem');
    }
    setLoading(false);
    // window.open(searchQuery, '_blank');
  };

  const renderDayOptions = () => {
    return Array.from({ length: 31 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));
  };

  const renderMonthOptions = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.map((month, index) => (
      <option key={index + 1} value={index + 1}>
        {month}
      </option>
    ));
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
  };
  const generatePoem = async () => {
    setLoading(true);
    try {
      const response = await fetch('api/generatePoem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: "Write a poem about a robot who dreams of being human." }),
      });

      const data = await response.json();
      if (response.ok) {
        setPoem(data.text); // Set the poem to the response text
      } else {
        setPoem('Failed to generate poem');
      }
    } catch (error) {
      console.error('Error:', error);
      setPoem('Error generating poem');
    }
    setLoading(false);
  };

  const translateToThai = (text: string): string => {
    const translations: { [key: string]: string } = {
      love: "ความรัก",
      career: "อาชีพ",
      health: "สุขภาพ",
      finance: "การเงิน",
      family: "ครอบครัว",
      friendship: "มิตรภาพ",
    };
    return translations[text.toLowerCase()] || text;
  };

  return (
    <div>
      <header>
        <div className="container">
          <img src="pic/gdsc.png" alt="GDSC Logo" id="logo" />
          <h1 id="title">{translations[language].title}</h1>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="th">ภาษาไทย</option>
          </select>
        </div>
      </header>

      <main>
        <div className="container">
          <h2 id="sub-title">{translations[language].subTitle}</h2>
          <div>
            <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">Day</option>
              {renderDayOptions()}
            </select>
            <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Month</option>
              {renderMonthOptions()}
            </select>
            <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Year</option>
              {renderYearOptions()}
            </select>
          </div>

          <h2 id="select-horoscope-type">{translations[language].horoscopeType}</h2>
          <input
            type="text"
            id="horoscope-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Type anything..."
          />
          <button onClick={getHoroscope} id="horoscope-btn">
            {translations[language].buttonText}
          </button>

          {/* Button to trigger poem generation */}
          <button onClick={generatePoem} id="generate-poem-btn" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Poem'}
          </button>

          {/* Display generated poem */}
          {poem && (
            <div>
              <h3>Generated Poem:</h3>
              <p>{poem}</p>
            </div>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Horoscope Website</p>
      </footer>
    </div>
  );
};

export default HoroscopeWebsite;
