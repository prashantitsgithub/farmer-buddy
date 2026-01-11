import React, { useState } from 'react';

const FlowerPlantsData = [
  {
    id: 1,
    name: "Marigold",
    image: "https://s3.amazonaws.com/eit-planttoolbox-prod/media/images/Tagetes-4028mdk09-CC_qluOtvIM9FmZ.jpeg",
    season: "year-round",
    soilType: "Loamy, Well-drained",
    duration: "60-75 days",
    pesticides: "Methyl parathion or quinalphos",
    growthTips: "Requires high temperature and abundant water supply.",
    video: "https://www.youtube.com/embed/KeqXc5rGVV4",
  },
  {
    id: 2,
    name: "Red rose",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/5/UW/JG/BU/136079621/51lyb8qmxll-1000x1000.jpg",
    season: "post-monsoon, winter",
    soilType: "loamy, Well-drained",
    duration: "45 days",
    pesticides: "insecticidal soap,Captan",
    growthTips: "Needs warm climate and moderate rainfall.",
    video: "https://www.youtube.com/embed/OEI-mgWZ9Ec",
  },
  {
    id: 3,
    name: "Hibiscus",
    image: "https://th.bing.com/th/id/OSK.uL3kAlSW17ovwUKXQ8YlMZsMFo3N96WAh3RVArxjIKU?w=200&h=200&c=7&rs=1&o=6&pid=SANGAM",
    season: "Tropical, High Altitude",
    soilType: "Rich, Well-drained",
    duration: "2-3 years",
    pesticides: "insecticidal soap, neem oil",
    growthTips: "Requires shade and high humidity.",
    video: "https://www.youtube.com/embed/P998Am6mFek",
  },
  {
    id: 4,
    name: "Gerbera Flower",
    image: "https://4.imimg.com/data4/TN/OA/MY-13256592/dsc03799-1000x1000.jpg",
    season: "late spring",
    soilType: "slightly Acidic, Well-drained",
    duration: "30-45 days",
    pesticides: "Neem Extract, Imidacloprid",
    growthTips: "Requires high humidity, sunlight and well-drained soil.",
    video: "https://www.youtube.com/embed/riD4vzl34hY",
  },
  {
    id: 5,
    name: "Jasmine flower",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/356356840/YR/UN/GJ/19185541/jasmine-plant-1000x1000.jpg",
    season: "summer and monsoon",
    soilType: "Loamy, Well-drained,acidic",
    duration: "9-12 months",
    pesticides: "Aphids",
    growthTips: "Needs well-drained, sunlight, pruning",
    video: "https://www.youtube.com/embed/Htgzu9hw2Bs",
  },
  {
    id: 6,
    name: "Tulip flower",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/3/397643406/PF/VP/IG/214484219/hll.jpg",
    season: "cool climate, spring",
    soilType: "Quire Well-drained , fertile",
    duration: "5-14 days(depends on variety)",
    pesticides: "Aphids",
    growthTips: "Needs well-drained, sunlight, pruning, mulching, foliage, watering",
    video: "https://www.youtube.com/embed/3qmz7xjVi1U",
  },
  {
    id: 7,
    name: "Orange Mokara Orchids Flower Plants",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/6/426889440/OP/VN/BV/46470149/a-1000x1000.png", 
    season: "Summer and early fall",
    soilType: "Well-drained medium",
    duration: "6-7 weeks",
    pesticides: "Malathion, orthene",
    growthTips: "Requires high humidity, sunlight and well-drained soil.",
    video: "https://www.youtube.com/embed/yi_Z8RHTk5s",
  },
  {
    id: 8,
    name: "White lily",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/3/494905637/YX/DJ/KM/109046666/peace-lilly-01-1000x1000.jpg",
    season: "Monsoon",
    soilType: "Acidic to neutral, Well-drained",
    duration: "25-30 days",
    pesticides: "Imidacloprid, dimethoate, wettable sulphur",
    growthTips: "Requires high humidity, sunlight and well-drained soil, semi-shaded.",
    video: "https://www.youtube.com/embed/otwYTq4m4MQ",
  },
];

const FlowerPlants = () => {
  const [expandedCrop, setExpandedCrop] = useState(null);

  const toggleHowItWorks = (id) => {
    setExpandedCrop(expandedCrop === id ? null : id);
  };

  return (
    <div className="container">
      {FlowerPlantsData.map((crop) => (
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

export default FlowerPlants;
