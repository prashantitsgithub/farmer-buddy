import React, { useState } from 'react';

const fruitData = [
  {
    id: 1,
    name: "Mango",
    image: "https://th.bing.com/th/id/R.62bb0850c71cd0b61934d799c80050f9?rik=NXHOAgUI%2fWTSjQ&riu=http%3a%2f%2fwww.asiafarming.com%2fwp-content%2fuploads%2f2015%2f10%2fMango-Farming-600x330.jpg&ehk=gjbv%2buf3cjcQJElsDYtAFkaVgPyLVELSjeEPx%2fTeB7w%3d&risl=&pid=ImgRaw&r=0",
    season: "Summer",
    soilType: "Well-drained Loamy",
    duration: "4-5 years (tree maturity)",
    pesticides: "Neem Oil, Carbaryl",
    growthTips: "Thrives in warm climate with deep, well-drained soil.",
    video: "https://www.youtube.com/embed/QjUZe-_zc2g",
  },
  {
    id: 2,
    name: "Banana",
    image: "https://thumbs.dreamstime.com/z/beautiful-banana-plantation-rich-harvest-ready-to-pick-up-174595992.jpg",
    season: "Year-round",
    soilType: "Fertile, Well-drained Loamy",
    duration: "10-12 months",
    pesticides: "Chlorpyrifos, Copper Fungicides",
    growthTips: "Needs warm climate, high humidity, and regular irrigation.",
    video: "https://www.youtube.com/embed/UH_3hE0wMwQ",
  },
  {
    id: 3,
    name: "Apple",
    image: "https://th.bing.com/th/id/OIP.kuRoOdwbYzlP5Max8L_wNAHaE8?rs=1&pid=ImgDetMain",
    season: "Winter",
    soilType: "Loamy, Well-drained",
    duration: "5-6 years (tree maturity)",
    pesticides: "Sulfur-based Fungicides, Carbendazim",
    growthTips: "Requires cold climate and proper pruning for better yield.",
    video: "https://www.youtube.com/embed/2zHe2mvdUU8",
  },
  {
    id: 4,
    name: "Papaya",
    image: "https://th.bing.com/th/id/OIP.wxYAEDo1CkDoU-S_dM27uAHaE8?rs=1&pid=ImgDetMain",
    season: "Year-round",
    soilType: "Well-drained Sandy Loam",
    duration: "6-9 months",
    pesticides: "Imidacloprid, Neem Extract",
    growthTips: "Prefers warm climate, needs regular watering and fertilization.",
    video: "https://www.youtube.com/embed/3dKBrND2tIY",
  },
  {
    id: 5,
    name: "Grapes",
    image: "https://www.almanac.com/sites/default/files/image_nodes/green-grapes.jpg",
    season: "Summer",
    soilType: "Sandy Loam, Well-drained",
    duration: "2-3 years (vine maturity)",
    pesticides: "Mancozeb, Copper Sulfate",
    growthTips: "Requires support structures, full sun, and regular pruning.",
    video: "https://www.youtube.com/embed/5eDJ0i0aRMw",
  },
  {
    id: 6,
    name: "Pineapple",
    image: "https://th.bing.com/th/id/R.4db9c1f1f1f23c028e91be39132e1643?rik=E9TqM0faZ1nXtg&riu=http%3a%2f%2fcdn.foodbeast.com%2fcontent%2fuploads%2f2016%2f12%2fPineapple-Farming.jpg&ehk=UI2nSpvifwwGB9K28nSaSV0h7jcQ9zoIK6j8adNrbIk%3d&risl=&pid=ImgRaw&r=0",
    season: "Year-round",
    soilType: "Loamy, Well-drained",
    duration: "16-24 months",
    pesticides: "Carbofuran, Organic Pest Control",
    growthTips: "Needs warm climate and well-drained, acidic soil.",
    video: "https://www.youtube.com/embed/G8YoOQeA4ws",
  },
  {
    id: 7,
    name: "Guava",
    image: "https://www.agrifarming.in/wp-content/uploads/VNR-Guava-Farming4.jpg",
    season: "Monsoon, Winter",
    soilType: "Sandy Loam, Well-drained",
    duration: "3-4 years (tree maturity)",
    pesticides: "Chlorpyrifos, Neem Spray",
    growthTips: "Thrives in warm climate, needs light pruning for better yield.",
    video: "https://www.youtube.com/embed/KrhfbsAimcI",
  },
  {
    id: 8,
    name: "Strawberry",
    image: "https://th.bing.com/th/id/OIP.6U45YV-n8YOCCo-3BRWuggHaEt?rs=1&pid=ImgDetMain",
    season: "Winter",
    soilType: "Loamy, Well-drained",
    duration: "4-6 months",
    pesticides: "Sulfur-based Fungicides",
    growthTips: "Requires cool climate, mulching, and regular watering.",
    video: "https://www.youtube.com/embed/xhR7I0ipbSM",
  },
];

const FruitFarming = () => {
  const [expandedCrop, setExpandedCrop] = useState(null);

  const toggleHowItWorks = (id) => {
    setExpandedCrop(expandedCrop === id ? null : id);
  };

  return (
    <div className="container">
      {fruitData.map((crop) => (
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

export default FruitFarming;
