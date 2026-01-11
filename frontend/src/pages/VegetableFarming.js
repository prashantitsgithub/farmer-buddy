import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cropData = [
  {
    id: 1,
    name: "Tomato",
    image: "https://www.agrifarming.in/wp-content/uploads/The-Complete-Guide-to-Tomato-Farming-1.jpg",
    season: "Rabi, Kharif",
    soilType: "Loamy, Sandy",
    duration: "90-120 days",
    pesticides: "Neem Oil, Insecticidal Soap",
    growthTips: "Plant in well-drained soil with full sun.",
    video: "https://youtu.be/FSFBPtRO4HU?si=6q4frkyyTV9CUWY5",
  },
  {
    id: 2,
    name: "Cucumber",
    image: "https://thumbs.dreamstime.com/z/cucumber-growing-farm-cucumber-growing-farm-background-159064412.jpg",
    season: "Summer",
    soilType: "Loamy, Well-drained",
    duration: "50-70 days",
    pesticides: "Copper-based Fungicides",
    growthTips: "Keep soil moist and provide support for vines.",
    video: "https://youtu.be/siutnsk714Y?si=VgsJPkrE94juRBwf",
  },
  {
    id: 3,
    name: "Brinjal (Eggplant)",
    image: "https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg",
    season: "Kharif, Rabi",
    soilType: "Well-drained Loamy",
    duration: "100-140 days",
    pesticides: "Chlorantraniliprole, Neem Oil",
    growthTips: "Needs warm climate and good drainage.",
    video: "https://youtu.be/sX0qKgRtn48?si=0MhTGpZkBp8XMUvk",
  },
  {
    id: 4,
    name: "Capsicum",
    image: "https://i.ytimg.com/vi/QhrUxLakJTI/maxresdefault.jpg",
    season: "Rabi, Summer",
    soilType: "Sandy Loam, Well-drained",
    duration: "120-150 days",
    pesticides: "Imidacloprid, Neem Extract",
    growthTips: "Grows best in greenhouses or warm environments.",
    video: "https://youtu.be/YgZIeXGxYXs?si=3m-krdASumSczZOj",
  },
  {
    id: 5,
    name: "Carrot",
    image: "https://kj1bcdn.b-cdn.net/media/25121/crop.png",
    season: "Winter",
    soilType: "Sandy Loam, Deep Loose",
    duration: "80-100 days",
    pesticides: "Chlorpyrifos, Organic Pest Control",
    growthTips: "Prefers cool climate and deep, loose soil.",
    video: "https://youtu.be/mcW9bQd8YuY?si=_XhkJAiiS1utpnfs",
  },
  {
    id: 6,
    name: "Onion",
    image: "https://www.agrifarming.in/wp-content/uploads/2018/03/Growing-Organic-Onions.-e1523106941962.jpg",
    season: "Rabi",
    soilType: "Loamy, Well-drained",
    duration: "100-120 days",
    pesticides: "Sulfur-based Fungicides",
    growthTips: "Needs well-drained soil and full sunlight.",
    video: "https://youtu.be/5AzTxLDL-hk?si=SBTw2Fws-uGz23eL",
  },
  {
    id: 7,
    name: "Potato",
    image: "https://th.bing.com/th/id/OIP.UMguHazombiHE0GWCDSY2wHaFj?rs=1&pid=ImgDetMain",
    season: "Rabi, Kharif",
    soilType: "Well-drained Sandy Loam",
    duration: "80-120 days",
    pesticides: "Mancozeb, Copper Fungicide",
    growthTips: "Grows well in cool temperatures with loose soil.",
    video: "https://youtu.be/6_q_I5w8qOE?si=Iya51ckrxOS3uuoX",
  },
  {
    id: 8,
    name: "Cauliflower",
    image: "https://i.ytimg.com/vi/1LwBIzmCwOo/maxresdefault.jpg",
    season: "Winter",
    soilType: "Fertile, Well-drained Loam",
    duration: "90-120 days",
    pesticides: "Bacillus thuringiensis, Neem Spray",
    growthTips: "Thrives in cool climate, needs regular irrigation.",
    video: "https://youtu.be/ghrQnGBF0zE?si=kv0VeVOFDsxQpXe3",
  },
  {
    id: 9,
    name: "Onion vagetable",
    image: "https://thumbs.dreamstime.com/b/onion-plantation-vegetable-23161448.jpg",
    season: "Winter or kharif & Rabi",
    soilType: "sandy loam or silt loam",
    duration: "80-150 days",
    pesticides: "Pyrethrins, zeta-cypermethrin, and malathion",
    growthTips: "Thrives in cool climate, needs regular irrigation.",
    video: "https://youtu.be/ghrQnGBF0zE?si=kv0VeVOFDsxQpXe3",
  },
  {
    id: 10,
    name: "Coriander",
    image: "https://www.asiafarming.com/wp-content/uploads/2023/01/Growing-Coriander-Organically-in-Madhya-Pradesh6-1024x604.jpg",
    season: "Winter or kharif",
    soilType: "Well-drained Loam & slight acidic",
    duration: "40-50 days",
    pesticides: "Carbendazim and mancozeb",
    growthTips: "Choose sunny spot with draining soil, maintain consistent moisture.",
    video: "https://youtu.be/ghrQnGBF0zE?si=kv0VeVOFDsxQpXe3",
  },
  {
    id: 11,
    name: "Red Amaranath",
    image: "https://thumbs.dreamstime.com/b/red-amaranth-farm-harvest-sell-236065870.jpg",
    season: "Kharif and Zaid",
    soilType: "Fertile, Well-drained Loam",
    duration: "20-45 days",
    pesticides: "Neem oil, insectional soap, organic fungicides",
    growthTips: "well-drained soil, corn for water retention and weed control, moisture soil.",
    video: "https://youtu.be/ghrQnGBF0zE?si=kv0VeVOFDsxQpXe3",
  },
  {
    id: 12,
    name: "Spinach",
    image: "https://lawn.com.au/wp-content/uploads/2022/10/how-to-grow-spinach.jpg",
    season: "Rabi",
    soilType: "rich Loamy soil",
    duration: "37-45 days",
    pesticides: "Malathion, Carbendazim & Indofil M-45, Glyphosate",
    growthTips: "Thrives in cool climate, needs regular irrigation.",
    video: "https://youtu.be/ghrQnGBF0zE?si=kv0VeVOFDsxQpXe3",
  },
  {
    id: 13,
    name: "Fenu-greek",
    image: "https://thumbs.dreamstime.com/b/spring-farm-field-young-alfalfa-grows-175097409.jpg",
    season: "Rabi & Kharif",
    soilType: "well-drained loamy soil",
    duration: "140-150 days",
    pesticides: "Dimethoate, thiamethoxam",
    growthTips: "Thrives in cool climate, needs regular irrigation.",
    video: "https://youtu.be/ghrQnGBF0zE?si=kv0VeVOFDsxQpXe3",
  },
];

// 🔁 Helper function to convert YouTube link to embed format
const getEmbedUrl = (url) => {
  const match = url.match(/(?:youtu\.be\/|v=)([^&\s?]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

const VegetableFarming = () => {
  const [expandedCrop, setExpandedCrop] = useState(null);

  const toggleHowItWorks = (id) => {
    setExpandedCrop(expandedCrop === id ? null : id);
  };

  return (
    <div className="container">
      {cropData.map((crop) => (
        <div key={crop.id} className="card">
          <img src={crop.image} alt={crop.name} />
          <div className="card-content">
            <h2>{crop.name}</h2>
            <button className="cta-button" onClick={() => toggleHowItWorks(crop.id)}>
              {expandedCrop === crop.id ? "Hide Details" : "Learn More"}
            </button>
            <p><strong>Season:</strong> {crop.season}</p>
            <p><strong>Pesticides:</strong> {crop.pesticides}</p>

            {expandedCrop === crop.id && (
              <div className="details">
                <p><strong>Growth Tips:</strong> {crop.growthTips}</p>
                <p><strong>Duration:</strong> {crop.duration}</p>
                <p><strong>Soil Type:</strong> {crop.soilType}</p>
                <div className="video-container" style={{ marginTop: '10px' }}>
                  <iframe
                    width="100%"
                    height="200"
                    src={getEmbedUrl(crop.video)}
                    title={crop.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VegetableFarming;
