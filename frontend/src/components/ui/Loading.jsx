import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Loading Text */}
      <div className="text-center space-y-3">
        <p className="text-xl font-bold text-gray-700 tracking-wide">
          Cooking Delicous Recipes
        </p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-600">Hang tight, chef!</span>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      {/* Professional CSS Animation */}
      <style>{`
        /* Professional loading dots */
        .loading-dots {
          display: inline-flex;
          gap: 3px;
          align-items: center;
        }
        
        .loading-dots span {
          width: 4px;
          height: 4px;
          background: #666;
          border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
        }
        
        .loading-dots span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .loading-dots span:nth-child(2) {
          animation-delay: 0.25s;
        }
        
        .loading-dots span:nth-child(3) {
          animation-delay: 0.5s;
        }
        
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .egg {
            width: 40px;
            height: 50px;
          }
          .yolk {
            width: 15px;
            height: 15px;
          }
        }
        
        /* Performance optimization */
        * {
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Loading;