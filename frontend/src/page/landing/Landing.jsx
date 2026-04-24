import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Sparkle, ArrowRight, ChefHat, Wallet, Globe, MagnifyingGlass } from '@phosphor-icons/react';
import FluentEmoji from '../../components/ui/FluentEmoji';
import MotionButton from '../../components/ui/MotionButton';
import RecipeCard from '../../components/ui/RecipeCard';
import SectionHeader from '../../components/ui/SectionHeader';
import TagPill from '../../components/ui/TagPill';
import { recipeSamples } from '../../data/mockData';

const Landing = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const chips = ['tomatoes, garlic, pasta', 'eggs, cheese', 'chicken, lemon'];
  const cuisines = [
    { label: 'Mexican', icon: 'taco' },
    { label: 'Asian', icon: 'noodles' },
    { label: 'Mediterranean', icon: 'fondue' },
    { label: 'Italian', icon: 'pizza' },
    { label: 'Indian', icon: 'curry' },
    { label: 'Healthy', icon: 'salad' },
    { label: 'American', icon: 'burger' },
    { label: 'Middle Eastern', icon: 'falafel' },
  ];

  const filters = useMemo(() => ['All', 'Quick <30min', 'Vegetarian', 'Budget', 'High Protein'], []);
  const handleFindRecipes = () => {
    const value = query.trim();
    if (!value) {
      navigate('/home');
      return;
    }
    navigate(`/home?ingredients=${encodeURIComponent(value)}`);
  };

  return (
    <div className="page">
      <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 0 100px' }} className="hero-grain">
        <div className="mesh-blobs">
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gap: 32, alignItems: 'center' }} className="hero-grid">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

              <h1 className="text-hero" style={{ marginTop: 20 }}>
                Cook What You Have.<br />
                <span style={{ color: 'var(--green-700)', fontStyle: 'italic', fontWeight: 400 }}>Eat What You Love.</span>
              </h1>

              <p style={{ marginTop: 18, maxWidth: 480, color: 'var(--text-secondary)', fontSize: 18 }}>
                Tell us what is in your kitchen. Our AI generates perfect recipes in seconds with no fridge-stare moments.
              </p>

              <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <MotionButton onClick={handleFindRecipes} icon={ArrowRight}>Generate Recipes</MotionButton>
                <MotionButton variant="ghost" icon={null}>Watch how it works</MotionButton>
              </div>

              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14, color: 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
                <div style={{ display: 'flex', marginRight: 6 }}>
                  {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #fff', marginLeft: i ? -8 : 0, background: ['#98d8aa', '#f3cb87', '#f6aaa1', '#9ec7f7', '#c5a9f2'][i] }} />)}
                </div>
                <span>Trusted by 10,000+ home cooks</span>
                <span style={{ fontFamily: 'Space Mono, monospace' }}>4.9/5 rating</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative' }}>
              <div className="hero-visual" style={{ position: 'relative', borderRadius: 40, background: 'var(--green-100)', minHeight: 520, padding: 20 }}>
                <svg viewBox="0 0 500 420" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <path d="M89,100 C130,35 235,5 326,39 C422,76 476,191 450,281 C422,377 301,426 200,405 C100,385 28,303 39,206 C47,158 60,133 89,100 Z" fill="rgba(26,107,60,0.1)" />
                </svg>

                <div style={{ position: 'absolute', top: 20, left: 16 }} className="float"><FluentEmoji name="avocado" size={72} /></div>
                <div style={{ position: 'absolute', top: 24, right: 24 }} className="float"><FluentEmoji name="lemon" size={68} /></div>
                <div style={{ position: 'absolute', bottom: 24, right: 16 }} className="float"><FluentEmoji name="herb" size={64} /></div>

                <div className="hero-stat-chip" style={{ position: 'absolute', left: 14, bottom: 84, background: '#fff', borderRadius: 16, padding: '10px 12px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, color: 'var(--green-700)' }}><Sparkle size={14} weight="duotone" /> 12 recipes found in 2s</div>
                </div>

                <div style={{ position: 'absolute', top: 70, right: 6, transform: 'rotate(-8deg)' }}><TagPill>Fresh ingredients</TagPill></div>

                <div className="hero-card-wrap" style={{ maxWidth: 360, margin: '52px auto 0' }}>
                  <RecipeCard recipe={recipeSamples[0]} />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ marginTop: 32, maxWidth: 680, marginInline: 'auto' }}>
            <div className="hero-search" style={{ borderRadius: 999, height: 60, background: '#fff', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', padding: '0 8px 0 16px', gap: 10 }}>
              <MagnifyingGlass size={20} color="var(--green-700)" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleFindRecipes();
                  }
                }}
                placeholder="What's in your fridge? e.g. eggs, tomatoes, basil..."
                style={{ border: 0, outline: 'none', background: 'transparent', flex: 1, fontSize: 15 }}
              />
              <MotionButton onClick={handleFindRecipes} icon={Sparkle} className="number-text">Find Recipes</MotionButton>
            </div>

            <div className="mobile-chip-scroll" style={{ marginTop: 10, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', paddingBottom: 4 }}>
              Try:
              {chips.map((chip) => (
                <button key={chip} type="button" onClick={() => setQuery(chip)} style={{ marginLeft: 12, border: 0, background: 'transparent', color: 'var(--green-700)', cursor: 'pointer', fontWeight: 600 }}>
                  {chip}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ marginTop: 48 }}>
        <Marquee speed={35} gradient gradientColor="#F7F4EF">
          {cuisines.map((c) => (
            <motion.div key={c.label} whileHover={{ y: -2 }} style={{ display: 'inline-flex', marginInline: 10, border: '1px solid var(--border)', borderRadius: 999, padding: '8px 16px', background: '#fff', alignItems: 'center', gap: 8 }}>
              <Globe size={14} />
              <FluentEmoji name={c.icon} size={18} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{c.label}</span>
            </motion.div>
          ))}
        </Marquee>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Why GlobalBites" title="Cooking, Reimagined" subtitle="A premium AI culinary workspace blending speed, taste, and confidence." center />
          <div className="grid-3">
            {[{ title: 'AI Recipe Intelligence', body: 'From 3 ingredients to 12 recipe options in under 2 seconds.', icon: Sparkle, bg: 'var(--green-100)' }, { title: 'Celebrity Chef Personas', body: 'Cook in the style of Gordon Ramsay, Julia Child, or Nobu.', icon: ChefHat, bg: 'var(--butter)' }, { title: 'Budget-Smart Meals', body: 'Set your budget and get per-ingredient cost breakdowns.', icon: Wallet, bg: 'var(--cream-pink)' }].map((item, idx) => {
              const FeatureIcon = item.icon;
              return (
              <motion.article key={item.title} className="card" style={{ padding: 24 }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: idx * 0.1 }} whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: item.bg, display: 'grid', placeItems: 'center' }}><FeatureIcon size={24} weight="duotone" color="var(--green-700)" /></div>
                <h3 style={{ marginTop: 14, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 20 }}>{item.title}</h3>
                <p style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: 14 }}>{item.body}</p>
              </motion.article>
            )})}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-muted)' }}>
        <div className="container">
          <SectionHeader eyebrow="Trending This Week" title="Trending This Week" subtitle="The most cooked recipes from our community this week." />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {filters.map((f) => (
              <motion.button key={f} type="button" whileTap={{ scale: 0.96 }} whileHover={{ y: -1 }} onClick={() => setActiveFilter(f)} className={`pill ${activeFilter === f ? 'pill-green' : 'pill-neutral'}`} style={{ fontSize: 12, textTransform: 'none', letterSpacing: 0 }}>
                {f}
              </motion.button>
            ))}
          </div>
          <div className="grid-3">
            {recipeSamples.map((recipe, idx) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={idx} onClick={() => navigate(`/recipe/${recipe.id}`)} />
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to="/home"><MotionButton>Explore All Recipes</MotionButton></Link>
          </div>
        </div>
      </section>

      <style>{`
        .hero-grid { grid-template-columns: 1fr; }
        @media (min-width: 1024px) { .hero-grid { grid-template-columns: 55% 45%; } }
      `}</style>
    </div>
  );
};

export default Landing;
