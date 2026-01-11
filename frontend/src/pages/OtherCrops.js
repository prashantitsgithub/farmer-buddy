import React, { useState } from 'react';

const highDemandCrops = [
  {
    id: 1,
    name: "Mushroom",
    image: "https://en-media.thebetterindia.com/uploads/2024/11/IMG_0408_-_Hungary_-_Mushroom_Farm_11zon-1731935057.jpg",
    season: "All Year (Controlled Environment)",
    soilType: "Compost, Organic Matter",
    duration: "30-60 days",
    pesticides: "Organic Antifungals",
    growthTips: "Grows in dark, humid places with controlled moisture.",
    video: "https://www.youtube.com/embed/GOcpp76DfH0",
  },
  {
    id: 2,
    name: "Dragon Fruit",
    image: "https://www.farmatma.in/wp-content/uploads/2024/01/dragon-fruit-farm.jpg",
    season: "Summer",
    soilType: "Well-drained Sandy Loam",
    duration: "1-2 Years",
    pesticides: "Neem Oil, Organic Fungicides",
    growthTips: "Grows well in warm climates with vertical support.",
    video: "https://www.youtube.com/embed/9KW8zSSeYr8",
  },
  {
    id: 3,
    name: "Cocoa",
    image: "https://www.idhsustainabletrade.com/uploaded/2016/04/Cocoa-pods-e1534499992924-1440x450-c-default.jpg?x39500&x39500",
    season: "Equatorial Climate",
    soilType: "Fertile, Moist Loamy",
    duration: "3-5 years (first yield)",
    pesticides: "Sulfur Fungicides, Insecticidal Soap",
    growthTips: "Needs humid climate, well-drained soil, and shade from direct sunlight.",
    video: "https://www.youtube.com/embed/73mNTNqhIR4",
  },
  {
    id: 4,
    name: "Vanilla",
    image: "https://www.tejaonthehorizon.com/wp-content/uploads/2021/06/Organic-vanilla-header.jpeg",
    season: "Tropical, Year-Round",
    soilType: "Rich Organic Loam, Well-drained",
    duration: "3-4 years (first yield)",
    pesticides: "Neem Oil, Copper-Based Fungicides",
    growthTips: "Requires humidity, shade, and manual pollination for best yield.",
    video: "https://www.youtube.com/embed/KJmnSjFUGQ4",
  },
  {
    id: 5,
    name: "Black Pepper",
    image: "https://www.agrifarming.in/wp-content/uploads/Black-Pepper-Cultivation-3.jpg",
    season: "Tropical, Year-Round",
    soilType: "Loamy, Well-drained with Organic Matter",
    duration: "2-3 years (first yield)",
    pesticides: "Neem Extract, Organic Fungicides",
    growthTips: "Needs high humidity, shaded conditions, and climbing support.",
    video: "https://www.youtube.com/embed/lC3L5CpnJF0",
  },
  {
    id: 6,
    name: "Cardamom",
    image: "https://eng.kisanofindia.com/wp-content/uploads/2024/05/Cardamom-cultivation-2.webp",
    season: "Tropical, Humid",
    soilType: "Deep Loamy with Organic Matter",
    duration: "3 years (first yield)",
    pesticides: "Organic Pesticides, Copper Fungicides",
    growthTips: "Thrives in shaded, humid environments with regular irrigation.",
    video: "https://www.youtube.com/embed/-eyQdfleUCo",
  },
  {
    id: 7,
    name: "Aloe Vera",
    image: "https://farmrise.bayer.com/webp_images/aloe-vera-farming_24865_1677490303.webp",
    season: "Arid, Semi-Tropical",
    soilType: "Sandy, Well-drained",
    duration: "8-12 months (first yield)",
    pesticides: "Organic Pest Control, Neem Extract",
    growthTips: "Prefers dry, warm climate and does not tolerate frost.",
    video: "https://www.youtube.com/embed/-mr7ZAX8yGk",
  },
  {
    id: 8,
    name: "Saffron",
    image: "https://www.agrifarming.in/wp-content/uploads/2015/08/Safforn-Farming.jpg",
    season: "Temperate, Cool",
    soilType: "Well-drained Sandy Loam",
    duration: "8-10 months",
    pesticides: "Organic Fungicides, Neem Oil",
    growthTips: "Requires cold winters and dry summers with proper irrigation.",
    video: "https://www.youtube.com/embed/z8YyMJUk6Wo",
  },
];

const HighDemandCrops = () => {
  const [expandedCrop, setExpandedCrop] = useState(null);

  const toggleDetails = (id) => {
    setExpandedCrop(expandedCrop === id ? null : id);
  };

  return (
    <div className="container">
      {highDemandCrops.map((crop) => (
        <div key={crop.id} className="card">
          <img src={crop.image} alt={crop.name} />
          <div className="card-content">
            <h2>{crop.name}</h2>
            <button className="cta-button" onClick={() => toggleDetails(crop.id)}>
              {expandedCrop === crop.id ? "Hide Details" : "Learn More"}
            </button>
            <p><strong>Season:</strong> {crop.season}</p>
            <p><strong>Soil Type:</strong> {crop.soilType}</p>
            {expandedCrop === crop.id && (
              <div className="details">
                <p><strong>Growth Tips:</strong> {crop.growthTips}</p>
                <p><strong>Soil Type:</strong> {crop.soilType}</p>
                <p><strong>Duration:</strong> {crop.duration}</p>
                <p><strong>Pesticides:</strong> {crop.pesticides}</p>
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

export default HighDemandCrops;
