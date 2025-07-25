import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Egg Animation Container */}
      <div className="relative flex items-center justify-center gap-3 mb-6">
        {/* Egg 1 */}
        <div className="egg egg-1">
          <div className="yolk"></div>
        </div>
        
        {/* Egg 2 */}
        <div className="egg egg-2">
          <div className="yolk"></div>
        </div>
        
        {/* Egg 3 */}
        <div className="egg egg-3">
          <div className="yolk"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center space-y-3">
        <p className="text-xl font-bold text-gray-700 tracking-wide">
          Cooking Egg-cellent Recipes
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
      <style jsx>{`
        .egg {
          width: 48px;
          height: 60px;
          background: linear-gradient(135deg, #fff8dc 0%, #f5deb3 50%, #daa520 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform-origin: center bottom;
          will-change: transform;
        }
        
        .yolk {
          width: 18px;
          height: 18px;
          background: radial-gradient(circle at 35% 25%, #fff700, #ffb347 70%);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 4px rgba(255, 183, 71, 0.5);
        }
        
        .yolk::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
        }
        
        /* Perfect Wave Animation - Each egg bounces in sequence */
        @keyframes eggBounce {
          0% {
            transform: translateY(0) scale(1);
            box-shadow: 
              0 2px 8px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
            box-shadow: 
              0 8px 16px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }
          100% {
            transform: translateY(0) scale(1);
            box-shadow: 
              0 2px 8px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
        }
        
        /* Synchronized timing for professional wave effect */
        .egg-1 {
          animation: eggBounce 1.5s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .egg-2 {
          animation: eggBounce 1.5s ease-in-out infinite;
          animation-delay: 0.25s;
        }
        
        .egg-3 {
          animation: eggBounce 1.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
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