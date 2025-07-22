import React, { useState, useEffect } from 'react';
import { Wrench, Code, Zap, Coffee } from 'lucide-react';

const Development = ({ 
  title = "🚧 Under Development", 
  subtitle = "We're crafting something amazing for you!",
  variant = "default", // "default", "minimal", "construction", "coding"
  showProgress = true,
  estimatedTime = "Coming Soon"
}) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { icon: Wrench, color: "text-orange-500" },
    { icon: Code, color: "text-blue-500" },
    { icon: Zap, color: "text-yellow-500" },
    { icon: Coffee, color: "text-brown-500" }
  ];

  // Simulate progress animation
  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0; // Reset when complete
          return prev + Math.random() * 3;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showProgress]);

  // Icon rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    default: {
      bg: "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100",
      primaryColor: "text-purple-600",
      secondaryColor: "text-gray-600",
      accentColor: "bg-purple-500"
    },
    minimal: {
      bg: "bg-gray-50",
      primaryColor: "text-gray-800",
      secondaryColor: "text-gray-500",
      accentColor: "bg-gray-400"
    },
    construction: {
      bg: "bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50",
      primaryColor: "text-orange-600",
      secondaryColor: "text-orange-700",
      accentColor: "bg-orange-500"
    },
    coding: {
      bg: "bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50",
      primaryColor: "text-green-600",
      secondaryColor: "text-teal-700",
      accentColor: "bg-green-500"
    }
  };

  const currentVariant = variants[variant];
  const CurrentIcon = icons[currentIcon].icon;

  return (
    <div className={`${currentVariant.bg} kg:w-1/2 m-auto rounded-3xl shadow-lg border border-white/50 backdrop-blur-sm overflow-hidden`}>
      <div className="relative p-12 text-center">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Circles */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-16 w-12 h-12 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-16 left-20 w-16 h-16 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-20 right-10 w-8 h-8 bg-white/35 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}></div>
          
          {/* Animated Lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 space-y-8">
          
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={`w-24 h-24 ${currentVariant.accentColor} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110`}>
                <CurrentIcon className={`w-12 h-12 text-white transition-all duration-500 ${currentIcon % 2 === 0 ? 'animate-spin' : 'animate-pulse'}`} />
              </div>
              
              {/* Pulsing Ring */}
              <div className={`absolute inset-0 ${currentVariant.accentColor} rounded-full animate-ping opacity-20`}></div>
              <div className={`absolute inset-2 ${currentVariant.accentColor} rounded-full animate-ping opacity-30`} style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-4">
            <h2 className={`text-4xl md:text-5xl font-bold ${currentVariant.primaryColor} animate-fade-in`}>
              {title}
            </h2>
            <p className={`text-lg md:text-xl ${currentVariant.secondaryColor} max-w-2xl mx-auto animate-fade-in`} style={{ animationDelay: '0.3s' }}>
              {subtitle}
            </p>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${currentVariant.secondaryColor}`}>
                  Development Progress
                </span>
                <span className={`text-sm font-bold ${currentVariant.primaryColor}`}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-3 shadow-inner">
                <div 
                  className={`${currentVariant.accentColor} h-3 rounded-full transition-all duration-500 ease-out shadow-sm`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  {/* Animated shine effect */}
                  <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer"></div>
                </div>
              </div>
            </div>
          )}

          {/* Estimated Time */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 ${currentVariant.primaryColor} font-semibold`}>
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            <span>Launch at: {estimatedTime}</span>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            {[
              { emoji: "⚡", title: "Fast & Smooth", desc: "Optimized performance" },
              { emoji: "🎨", title: "Beautiful UI", desc: "Modern design" },
              { emoji: "📱", title: "Responsive", desc: "Works everywhere" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 transform transition-all duration-300 hover:scale-105 hover:bg-white/40"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl mb-3 animate-bounce" style={{ animationDelay: `${index * 0.5}s`, animationDuration: '2s' }}>
                  {feature.emoji}
                </div>
                <h4 className={`font-bold text-lg ${currentVariant.primaryColor} mb-2`}>
                  {feature.title}
                </h4>
                <p className={`text-sm ${currentVariant.secondaryColor}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2].map(index => (
              <div
                key={index}
                className={`w-3 h-3 ${currentVariant.accentColor} rounded-full animate-bounce`}
                style={{ animationDelay: `${index * 0.2}s`, animationDuration: '1s' }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

// Example usage component
// const ExampleUsage = () => {
//   const [currentVariant, setCurrentVariant] = useState("default");
  
//   const variants = ["default", "minimal", "construction", "coding"];
  
//   return (
//     <div className="min-h-screen bg-gray-100 p-8 space-y-12">
      
//       {/* Variant Selector */}
//       <div className="text-center space-y-4">
//         <h1 className="text-3xl font-bold text-gray-800">Under Development Component</h1>
//         <div className="flex justify-center gap-4 flex-wrap">
//           {variants.map(variant => (
//             <button
//               key={variant}
//               onClick={() => setCurrentVariant(variant)}
//               className={`px-4 py-2 rounded-full font-medium transition-all ${
//                 currentVariant === variant 
//                   ? 'bg-purple-600 text-white shadow-lg' 
//                   : 'bg-white text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               {variant.charAt(0).toUpperCase() + variant.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Component Examples */}
//       <div className="max-w-4xl mx-auto space-y-8">
        
//         {/* Default Example */}
//         <UnderDevelopment 
//           variant={currentVariant}
//           title="🚀 New Features Coming"
//           subtitle="We're building something incredible that will revolutionize your experience!"
//           estimatedTime="Launch in Q2 2025"
//         />
        
//         {/* Different Configuration */}
//         <UnderDevelopment 
//           variant={currentVariant}
//           title="🎨 Design System"
//           subtitle="Our design team is crafting beautiful components for you"
//           showProgress={false}
//           estimatedTime="Beta Available Soon"
//         />
        
//       </div>

//       {/* Usage Instructions */}
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
//         <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Use</h3>
//         <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
//           <div className="text-gray-600 mb-2">// Basic usage</div>
//           <div className="text-blue-600">&lt;UnderDevelopment /&gt;</div>
          
//           <div className="text-gray-600 mt-4 mb-2">// With custom props</div>
//           <div className="text-blue-600">
//             &lt;UnderDevelopment<br/>
//             &nbsp;&nbsp;title="🔥 Coming Soon"<br/>
//             &nbsp;&nbsp;subtitle="Amazing features in development"<br/>
//             &nbsp;&nbsp;variant="coding"<br/>
//             &nbsp;&nbsp;showProgress={'{false}'}<br/>
//             &nbsp;&nbsp;estimatedTime="Next Month"<br/>
//             /&gt;
//           </div>
//         </div>
        
//         <div className="mt-6">
//           <h4 className="font-bold text-gray-700 mb-2">Available Props:</h4>
//           <ul className="text-sm text-gray-600 space-y-1">
//             <li><code>title</code> - Main heading text</li>
//             <li><code>subtitle</code> - Description text</li>
//             <li><code>variant</code> - "default" | "minimal" | "construction" | "coding"</li>
//             <li><code>showProgress</code> - Show animated progress bar</li>
//             <li><code>estimatedTime</code> - Expected completion time</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Development;