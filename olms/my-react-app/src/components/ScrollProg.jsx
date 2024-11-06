import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      
      const percentage = (scrollTop / scrollableHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-2 h-32 bg-gray-200 rounded-full">
      <div 
        className="w-full bg-blue-500 rounded-full transition-all duration-200"
        style={{ 
          height: `${scrollPercentage}%`,
          position: 'absolute',
          bottom: 0
        }}
      />
    </div>
  );
};

export default ScrollProgress;