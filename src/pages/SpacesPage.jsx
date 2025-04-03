import React from 'react';
import Space from '../components/Space';

import '../styles/SpacesPage.css'; // Ensure the CSS file is imported

const SpacesPage = ({ spaces }) => {
  console.log('SpacesPage received spaces:', spaces);

  if (!spaces || spaces.length === 0) {
    return <div>No spaces available</div>;
  }

  return (
    <div className="spaces-page"> {/* Apply the CSS class */}
        <h1>Spaces</h1>
        <p>This is where you can view your spaces and organize your tasks.</p>
      {spaces.map((space, index) => (
        <div key={index} className="space-container">
          <Space space={space} />
        </div>
      ))}
    </div>
  );
};

export default SpacesPage;
