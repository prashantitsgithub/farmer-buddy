import React, { useState } from 'react';

const cashCropsData = [
  {
    id: 1,
    name: "Sugarcane",
    image: "https://eos.com/wp-content/uploads/2022/11/growing-sugar-cane.jpg.webp",
    season: "Tropical & Subtropical",
    soilType: "Loamy, Well-drained",
    duration: "10-18 months",
    pesticides: "Chlorpyrifos, Imidacloprid",
    growthTips: "Requires high temperature and abundant water supply.",
    video: "https://www.youtube.com/embed/ZfTIyrGQ8Fc",
  },
  {
    id: 2,
    name: "Cotton",
    image: "https://civileats.com/wp-content/uploads/2021/03/210315-organic-cotton-farming-consumers-demand-india-incentives-1-top.jpg",
    season: "Kharif",
    soilType: "Black soil, Well-drained",
    duration: "150-180 days",
    pesticides: "Malathion, Neem Oil",
    growthTips: "Needs warm climate and moderate rainfall.",
    video: "https://www.youtube.com/embed/eN-TqqBQOAk",
  },
  {
    id: 3,
    name: "Coffee",
    image: "https://www.agrifarming.in/wp-content/uploads/Coffee-Cultivation-in-India-4.jpg",
    season: "Tropical, High Altitude",
    soilType: "Rich, Well-drained",
    duration: "3-4 years (first yield)",
    pesticides: "Copper Oxychloride, Bordeaux Mixture",
    growthTips: "Requires shade and high humidity.",
    video: "https://www.youtube.com/embed/EjXx4SxqxcQ",
  },
  {
    id: 4,
    name: "Tea",
    image: "https://www.ibef.org/assets/images/exports/Tea-Industry.jpg",
    season: "Tropical & Subtropical",
    soilType: "Acidic, Well-drained",
    duration: "3-5 years (first yield)",
    pesticides: "Neem Extract, Pyrethrin",
    growthTips: "Requires high humidity and well-drained soil.",
    video: "https://www.youtube.com/embed/dTHansLrH0M",
  },
  {
    id: 5,
    name: "Tobacco",
    image: "https://eos.com/wp-content/uploads/2024/10/growing-tobacco-main.jpg.webp",
    season: "Warm & Dry Climate",
    soilType: "Light, Well-drained",
    duration: "100-120 days",
    pesticides: "Carbaryl, Malathion",
    growthTips: "Needs well-drained sandy soil and warm temperatures.",
    video: "https://www.youtube.com/embed/voqCZcGzNFo",
  },
  {
    id: 6,
    name: "Jute",
    image: "https://gojuteinternational.com/wp-content/uploads/2024/01/Jute-Cultivation-jpg.webp",
    season: "Kharif",
    soilType: "Alluvial, Moist",
    duration: "120-150 days",
    pesticides: "Mancozeb, Copper Fungicides",
    growthTips: "Requires high temperature and humidity.",
    video: "https://www.youtube.com/embed/ZRMSg4BGRE0",
  },
  {
    id: 7,
    name: "Rubber",
    image: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-532366,resizemode-75,msid-93653883/news/economy/agriculture/vast-stretch-of-land-identified-in-north-east-and-west-bengal-for-rubber-cultivation.jpg",
    season: "Tropical",
    soilType: "Well-drained Laterite",
    duration: "6-7 years (first yield)",
    pesticides: "Bordeaux Mixture, Copper Fungicides",
    growthTips: "Requires humid climate and plenty of rainfall.",
    video: "https://www.youtube.com/embed/38aGjpn15bM",
  },
  {
    id: 8,
    name: "Indigo",
    image: "https://img-cdn.krishijagran.com/75169/indigo.jpg",
    season: "Warm & Dry Climate",
    soilType: "Sandy Loam, Well-drained",
    duration: "90-120 days",
    pesticides: "Organic Pest Control, Neem Spray",
    growthTips: "Requires warm temperatures and well-drained soil.",
    video: "https://www.youtube.com/embed/IzrVhjZiy2M",
  },
];

const CashCrops = () => {
  const [expandedCrop, setExpandedCrop] = useState(null);

  const toggleHowItWorks = (id) => {
    setExpandedCrop(expandedCrop === id ? null : id);
  };

  return (
    <div className="container">
      {cashCropsData.map((crop) => (
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
                <p><strong>Soil Type:</strong> {crop.soilType}</p>
                <p><strong>Growth Tips:</strong> {crop.growthTips}</p>
                <p><strong>Duration:</strong> {crop.duration}</p>
                <div className="video-container">
                  <iframe 
                    width="100%" 
                    height="200" 
                    src={crop.video} 
                    title={crop.name} 
                    frameBorder="0" 
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

export default CashCrops;
