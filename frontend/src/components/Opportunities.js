import React, { useState } from 'react';

const Opportunities = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="opportunities-container">
      <div className="head">
        <h1>Opportunities</h1>
        <h2><b>It is one of the best platforms that helps farmers</b></h2>
      </div>

      <section className="opportunities">
        <div className="opportunity">
          <h2>🌱 Connect to More Farmers</h2>
          <p style={{ color: 'red' }}><b>"Expand your network and share knowledge"</b></p>

          <h3>
            <p><b>Providing a platform for farmers to access information, tools, and resources</b></p>
            <p><b>Enabling farmers to interact with each other and with experts</b></p>  
            <p><b>Connect a larger number of farmers through this platform</b></p>
          </h3>
        </div>

        <div className="opportunity">
          <h2>📈 Grow Your Farming Level</h2>
          <p style={{ color: 'red' }}><b>"Upgrade your skills with expert advice"</b></p>
          <h3>
            <p><b>1. Improve farming skills and knowledge:</b> Enhance your farming abilities.</p>
            <p><b>2. Learn new techniques:</b> Acquire new methods and practices.</p>
            <p><b>3. Optimize crop yields:</b> Increase crop production and quality.</p>
            <p><b>4. Manage pests effectively:</b> Control pests to minimize damage.</p>
            <p><b>5. Stay updated with advanced practices:</b> Keep learning about new agricultural methods.</p>
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Opportunities;
