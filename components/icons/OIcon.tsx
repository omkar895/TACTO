
import React from 'react';

const OIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9"></circle>
    </svg>
  );
};

export default OIcon;
