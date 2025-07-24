import React, { useState } from 'react';
import { ChevronRight, Heart, Zap, Coffee, PartyPopper, Bed, Frown, Sparkles, Star } from 'lucide-react';

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState('happy');
  const [customMood, setCustomMood] = useState('');
  const [showCustomResults, setShowCustomResults] = useState(false);

  const moods = [
    {
      id: 'happy',
      name: 'Happy',
      emoji: '😊',
      icon: Heart,
      color: 'from-yellow-400 to-orange-500',
      bgAccent: 'bg-yellow-50',
      tooltip: 'Light, fresh foods maintain your positive energy'
    },
    {
      id: 'sad',
      name: 'Sad',
      emoji: '😢',
      icon: Frown,
      color: 'from-blue-400 to-indigo-500',
      bgAccent: 'bg-blue-50',
      tooltip: 'Comfort foods boost serotonin and mood naturally'
    },
    {
      id: 'stressed',
      name: 'Stressed',
      emoji: '😩',
      icon: Coffee,
      color: 'from-red-400 to-pink-500',
      bgAccent: 'bg-red-50',
      tooltip: 'Comfort foods reduce cortisol levels'
    },
    {
      id: 'celebratory',
      name: 'Celebratory',
      emoji: '🎉',
      icon: PartyPopper,
      color: 'from-purple-400 to-pink-500',
      bgAccent: 'bg-purple-50',
      tooltip: 'Special dishes make moments more memorable'
    },
    {
      id: 'lazy',
      name: 'Lazy',
      emoji: '😴',
      icon: Bed,
      color: 'from-gray-400 to-slate-500',
      bgAccent: 'bg-gray-50',
      tooltip: 'Quick, easy meals for low-energy days'
    },
    {
      id: 'energetic',
      name: 'Energetic',
      emoji: '⚡',
      icon: Zap,
      color: 'from-green-400 to-teal-500',
      bgAccent: 'bg-green-50',
      tooltip: 'Protein-rich foods sustain your high energy'
    }
  ];

  const recipes = {
    happy: [
      {
        name: 'Rainbow Buddha Bowl',
        image: '🥗',
        reason: 'Colorful vegetables boost mood through visual appeal and provide essential vitamins for sustained happiness.',
        difficulty: 'Easy',
        time: '15 min',
        rating: 4.8
      },
      {
        name: 'Citrus Salmon Salad',
        image: '🐟',
        reason: 'Omega-3 fatty acids support brain health while citrus provides vitamin C for natural mood elevation.',
        difficulty: 'Medium',
        time: '25 min',
        rating: 4.9
      },
      {
        name: 'Berry Smoothie Bowl',
        image: '🫐',
        reason: 'Antioxidants in berries protect against stress while natural sugars provide gentle energy.',
        difficulty: 'Easy',
        time: '10 min',
        rating: 4.7
      },
      {
        name: 'Avocado Toast Delight',
        image: '🥑',
        reason: 'Healthy fats and fiber keep mood stable while the simple preparation maintains your positive state.',
        difficulty: 'Easy',
        time: '8 min',
        rating: 4.6
      }
    ],
    sad: [
      {
        name: 'Creamy Mushroom Risotto',
        image: '🍄',
        reason: 'Warm, creamy textures provide comfort while mushrooms contain mood-boosting B vitamins.',
        difficulty: 'Medium',
        time: '35 min',
        rating: 4.9
      },
      {
        name: 'Chocolate Chip Cookies',
        image: '🍪',
        reason: 'Dark chocolate releases endorphins and provides gentle comfort during difficult times.',
        difficulty: 'Easy',
        time: '20 min',
        rating: 4.8
      },
      {
        name: 'Hearty Tomato Soup',
        image: '🍅',
        reason: 'Warm liquids soothe the soul while tomatoes contain lycopene for mood regulation.',
        difficulty: 'Easy',
        time: '30 min',
        rating: 4.7
      },
      {
        name: 'Mac and Cheese',
        image: '🧀',
        reason: 'Ultimate comfort food that triggers nostalgic feelings and provides calcium for relaxation.',
        difficulty: 'Easy',
        time: '25 min',
        rating: 4.9
      }
    ],
    stressed: [
      {
        name: 'Chamomile Tea & Honey Cake',
        image: '🍰',
        reason: 'Chamomile naturally reduces anxiety while honey provides gentle sweetness to calm nerves.',
        difficulty: 'Medium',
        time: '45 min',
        rating: 4.6
      },
      {
        name: 'Warm Oatmeal Bowl',
        image: '🥣',
        reason: 'Complex carbs increase serotonin production, helping reduce stress hormones naturally.',
        difficulty: 'Easy',
        time: '12 min',
        rating: 4.5
      },
      {
        name: 'Green Tea Ice Cream',
        image: '🍦',
        reason: 'L-theanine in green tea promotes relaxation while cool temperature soothes tension.',
        difficulty: 'Hard',
        time: '2 hours',
        rating: 4.8
      },
      {
        name: 'Lavender Shortbread',
        image: '💜',
        reason: 'Lavender has calming properties while the act of baking can be meditative and stress-relieving.',
        difficulty: 'Medium',
        time: '40 min',
        rating: 4.7
      }
    ],
    celebratory: [
      {
        name: 'Champagne Truffle Cake',
        image: '🍾',
        reason: 'Luxurious flavors and elegant presentation make special moments feel even more memorable.',
        difficulty: 'Hard',
        time: '3 hours',
        rating: 4.9
      },
      {
        name: 'Lobster Thermidor',
        image: '🦞',
        reason: 'Premium ingredients create a sense of occasion and make celebrations feel truly special.',
        difficulty: 'Hard',
        time: '1.5 hours',
        rating: 4.8
      },
      {
        name: 'Rainbow Macarons',
        image: '🌈',
        reason: 'Colorful, delicate treats add visual joy and sophisticated sweetness to any celebration.',
        difficulty: 'Hard',
        time: '2 hours',
        rating: 4.9
      },
      {
        name: 'Stuffed Portobello Wellington',
        image: '🍄',
        reason: 'Impressive presentation and rich flavors create a centerpiece worthy of your special moment.',
        difficulty: 'Medium',
        time: '50 min',
        rating: 4.7
      }
    ],
    lazy: [
      {
        name: '5-Minute Mug Cake',
        image: '☕',
        reason: 'Instant gratification with minimal cleanup - perfect for when you want dessert without effort.',
        difficulty: 'Easy',
        time: '5 min',
        rating: 4.4
      },
      {
        name: 'No-Cook Wraps',
        image: '🌯',
        reason: 'Fresh ingredients require zero cooking while providing balanced nutrition and satisfying flavors.',
        difficulty: 'Easy',
        time: '8 min',
        rating: 4.5
      },
      {
        name: 'Overnight Oats',
        image: '🥛',
        reason: 'Prepare the night before for a nutritious breakfast that requires zero morning effort.',
        difficulty: 'Easy',
        time: '2 min prep',
        rating: 4.6
      },
      {
        name: 'Microwave Pasta',
        image: '🍝',
        reason: 'Comfort food in minutes with minimal dishes - perfect for low-energy days.',
        difficulty: 'Easy',
        time: '10 min',
        rating: 4.3
      }
    ],
    energetic: [
      {
        name: 'Power Protein Bowl',
        image: '💪',
        reason: 'High-protein ingredients fuel your energy while complex carbs provide sustained power.',
        difficulty: 'Easy',
        time: '18 min',
        rating: 4.8
      },
      {
        name: 'Spicy Thai Stir-Fry',
        image: '🌶️',
        reason: 'Capsaicin boosts metabolism while bold flavors match your high-energy mood.',
        difficulty: 'Medium',
        time: '22 min',
        rating: 4.7
      },
      {
        name: 'Energy Bite Snacks',
        image: '⚡',
        reason: 'Nuts, dates, and seeds provide quick energy bursts perfect for active days.',
        difficulty: 'Easy',
        time: '15 min',
        rating: 4.6
      },
      {
        name: 'Quinoa Power Salad',
        image: '🥗',
        reason: 'Complete protein and fresh vegetables fuel your body for sustained high performance.',
        difficulty: 'Easy',
        time: '20 min',
        rating: 4.9
      }
    ]
  };

  const handleCustomMoodSubmit = () => {
    if (customMood.trim()) {
      setShowCustomResults(true);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-600 bg-emerald-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={`${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-600 to-teal-400 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-300"></div>
      </div>

      {/* Floating Food Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 text-4xl animate-bounce opacity-20 select-none">🍕</div>
        <div className="absolute top-32 right-20 text-3xl animate-bounce opacity-20 delay-300 select-none">🍰</div>
        <div className="absolute top-24 left-1/2 text-5xl animate-bounce opacity-15 delay-700 select-none">🥗</div>
        <div className="absolute bottom-32 right-1/3 text-3xl animate-bounce opacity-20 delay-500 select-none">🍜</div>
        <div className="absolute bottom-24 left-20 text-4xl animate-bounce opacity-15 delay-1000 select-none">🥑</div>
      </div>
      
      {/* Header Section */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4 text-center mt-4">
          
          <div className="space-y-4 mb-8">
            <h1 className="text-5xl md:text-7xl font-black text-[#1E293B] leading-tight">
              What's Your
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900 bg-clip-text text-transparent"> Mood </span>
              Today?
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1E293B]/80">
              Let's Cook Accordingly!
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <p className="text-lg md:text-xl text-[#1E293B] leading-relaxed">
              Tell us how you feel, and we'll tell you what to eat — with reasons backed by 
              <span className="font-semibold text-yellow-400"> food science </span> and emotions.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 relative z-10">
        {/* Enhanced Mood Selection */}
        <div className="bg-white/60 backdrop-blur-xl  rounded-3xl shadow-2xl p-5 lg:p-8 md:p-12 mb-12 border border-white/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#aeff67] to-[#26e7a0] text-slate-600 px-6 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              Choose Your Vibe
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-700 mb-2">
              How Are You Feeling?
            </h3>
            <p className="text-[#64748B] text-lg">Select your current mood to discover perfect recipes</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              const isSelected = selectedMood === mood.id;
              return (
                <div
                  key={mood.id}
                  className={`relative group cursor-pointer h transition-all duration-500 hover:scale-105 ${
                    isSelected ? 'scale-105' : ''
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <div className={`relative overflow-hidden rounded-3xl  transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-br from-white to-gray-50 shadow-2xl ring-4 ring-[#FF6B6B]/50' 
                      : 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 shadow-lg hover:shadow-xl'
                  } border-2 ${isSelected ? 'border-[#FF6B6B]' : 'border-gray-200 hover:border-[#FF6B6B]/30'}`}>
                    
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 ${mood.bgAccent} opacity-30`}></div>
                    
                    <div className="relative lg:p-6 p-3 text-center">
                      {/* Icon Container */}
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${mood.color} flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 ${
                        isSelected ? 'rotate-12 scale-110' : 'group-hover:rotate-6 group-hover:scale-105'
                      }`}>
                        <IconComponent size={28} />
                      </div>
                      
                      {/* Emoji */}
                      <div className={`text-4xl mb-3 transition-transform duration-300 ${
                        isSelected ? 'scale-125' : 'group-hover:scale-110'
                      }`}>
                        {mood.emoji}
                      </div>
                      
                      {/* Mood Name */}
                      <div className={`font-bold text-[#1E293B] transition-colors duration-300 ${
                        isSelected ? 'text-lg' : 'group-hover:text-[#FF6B6B]'
                      }`}>
                        {mood.name}
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-[#1E293B] text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 shadow-xl">
                    <div className="font-medium">{mood.tooltip}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-[#1E293B]"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Recipe Recommendations */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-white/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${moods.find(m => m.id === selectedMood)?.color} animate-pulse`}></div>
              <span className="text-[#64748B] font-medium">
                {moods.find(m => m.id === selectedMood)?.name} Mood Recipes
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-2">
              Perfect for Your Current Vibe
            </h3>
            <p className="text-[#64748B] text-lg">Scientifically curated recipes to match your mood</p>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {recipes[selectedMood]?.map((recipe, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Recipe Image/Emoji */}
                <div className="relative p-8 text-center bg-gradient-to-br from-gray-50 to-white">
                  <div className="text-7xl mb-2 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {recipe.image}
                  </div>
                  <div className="absolute top-4 right-4">
                    {renderStars(recipe.rating)}
                  </div>
                </div>
                
                {/* Recipe Details */}
                <div className="p-6 space-y-4">
                  <h4 className="text-xl font-bold text-[#1E293B] group-hover:text-[#FF6B6B] transition-colors duration-300">
                    {recipe.name}
                  </h4>
                  
                  <p className="text-[#64748B] text-sm leading-relaxed line-clamp-3">
                    {recipe.reason}
                  </p>
                  
                  {/* Recipe Meta */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </span>
                      <span className="text-xs text-[#64748B] bg-gray-100 px-3 py-1 rounded-lg">
                        ⏱️ {recipe.time}
                      </span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900 py-4 px-6 rounded-2xl font-semibold hover:from-[#FF5252] hover:to-[#FF7979] transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]">
                    Try This Recipe
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B6B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Custom Mood Input */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3dd39c] to-[#2bc48a] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              AI Powered
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-2">
              Describe Your Exact Mood
            </h3>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Tell us exactly how you're feeling, and our AI will recommend the perfect recipes tailored just for you!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="relative">
              <textarea
                value={customMood}
                onChange={(e) => setCustomMood(e.target.value)}
                placeholder="I'm feeling a bit overwhelmed with work but excited about the weekend coming up. Looking for something comforting yet energizing..."
                className="w-full p-6 border-2 border-gray-200 rounded-2xl resize-none h-40 focus:border-orange-400 focus:outline-none transition-all duration-300 text-[#1E293B] placeholder:text-[#64748B] bg-white shadow-inner"
              />
              <div className="absolute bottom-4 right-4 text-xs text-[#64748B]">
                {customMood.length}/500
              </div>
            </div>
            
            <button
              onClick={handleCustomMoodSubmit}
              className="w-full bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900  py-4 px-8 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!customMood.trim()}
            >
              <Sparkles size={18} className="animate-pulse" />
              Get My Personal Recommendations
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Enhanced Custom Results */}
          {showCustomResults && customMood && (
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#b7f382]/20 to-[#3dd39c]/20 rounded-2xl p-8 border border-[#3dd39c]/30 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#1E293B] mb-4">
                    <Sparkles size={16} className="text-[#3dd39c]" />
                    AI Analysis Complete
                  </div>
                  <h4 className="text-2xl font-bold text-[#1E293B] mb-3">
                    Based on your mood description
                  </h4>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-[#64748B] italic max-w-2xl mx-auto">
                    "{customMood.slice(0, 100)}..."
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-4xl mb-4">🍵</div>
                    <h5 className="text-lg font-bold text-[#1E293B] mb-3">Calming Herbal Tea</h5>
                    <p className="text-sm text-[#64748B] mb-4">A warm, soothing drink to help you unwind and reset your mood naturally.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">Relaxing</span>
                      <div className="flex text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-4xl mb-4">🥗</div>
                    <h5 className="text-lg font-bold text-[#1E293B] mb-3">Fresh Garden Salad</h5>
                    <p className="text-sm text-[#64748B] mb-4">Light, nutritious meal that energizes without weighing you down.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">Energizing</span>
                      <div className="flex text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                    <div className="text-4xl mb-4">🍯</div>
                    <h5 className="text-lg font-bold text-[#1E293B] mb-3">Honey Lavender Cookies</h5>
                    <p className="text-sm text-[#64748B] mb-4">Sweet comfort with calming properties for the perfect mood balance.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">Balanced</span>
                      <div className="flex text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mood;