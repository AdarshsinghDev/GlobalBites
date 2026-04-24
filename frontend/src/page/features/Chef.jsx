import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkle } from '@phosphor-icons/react';
import MotionButton from '../../components/ui/MotionButton';
import TagPill from '../../components/ui/TagPill';
import FluentEmoji from '../../components/ui/FluentEmoji';
import { useChefContext } from '../../context/ChefContext';
import api from '../../lib/api';

const palette = [
  'linear-gradient(135deg, #C0392B, #E74C3C)',
  'linear-gradient(135deg, #2E4057, #5B8DB8)',
  'linear-gradient(135deg, #F39C12, #E67E22)',
  'linear-gradient(135deg, #27AE60, #2ECC71)',
  'linear-gradient(135deg, #1A1A2E, #4A4A6E)',
  'linear-gradient(135deg, #E91E63, #F48FB1)',
];

const getChefName = (chef) => chef?.chefName || chef?.name || 'Chef';
const getChefCuisine = (chef) => chef?.chefCusine || chef?.cuisine || chef?.chefCountry || 'Global';
const getChefTagline = (chef) => chef?.chefSpeciality || chef?.tagline || 'Signature culinary style';
const getChefImage = (chef) => chef?.chefImg || chef?.image || '';
const getChefGradient = (chef) => chef?.gradient || palette[Number(chef?.id || 0) % palette.length];

const Chef = () => {
  const { chefContextData, selectedChef, setSelectedChef } = useChefContext();
  const [dish, setDish] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  const suggestions = useMemo(() => ['Paneer Tikka', 'Butter Chicken', 'Dal Makhani', 'Veg Biryani'], []);
  const chefs = useMemo(() => (Array.isArray(chefContextData) && chefContextData.length > 0 ? chefContextData : []), [chefContextData]);
  const effectiveSelectedChef = selectedChef || chefs[0];

  useEffect(() => {
    if (!selectedChef && chefs.length > 0 && setSelectedChef) {
      setSelectedChef(chefs[0]);
    }
  }, [selectedChef, chefs, setSelectedChef]);

  const handleGenerate = async () => {
    if (!dish.trim() || !effectiveSelectedChef) {
      setError('Please choose chef and enter dish name.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const { data } = await api.post(
        '/api/recipe-ai/ai-chef',
        {
          chefName: getChefName(effectiveSelectedChef),
          generateRecipe: dish.trim(),
        },
        { timeout: 60000 }
      );
      setGeneratedRecipe(data?.recipe || null);
      if (!data?.recipe) {
        setError('No recipe returned from AI. Try again.');
      }
    } catch (apiError) {
      setError(apiError?.response?.data?.error || 'Recipe generation failed.');
      setGeneratedRecipe(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page section">
      <div className="container">
        <div className="text-label">AI Chef Personas</div>
        <h1 className="text-h1" style={{ marginTop: 8 }}>Cook with a Legend</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Select a chef and generate chef-style recipe instructions.</p>

        <div style={{ marginTop: 24 }} className="chef-grid">
          {chefs.map((chef) => {
            const on = String(effectiveSelectedChef?.id) === String(chef.id);
            const chefName = getChefName(chef);
            const chefCuisine = getChefCuisine(chef);
            const chefTagline = getChefTagline(chef);
            const chefGradient = getChefGradient(chef);
            const chefImage = getChefImage(chef);
            return (
              <motion.button key={chef.id} type="button" whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedChef?.(chef)} className="card" style={{ textAlign: 'center', padding: 24, borderRadius: 'var(--radius-xl)', borderWidth: on ? 2.5 : 1.5, borderColor: on ? 'var(--green-700)' : 'var(--border)', background: on ? 'var(--green-50)' : '#fff', position: 'relative' }}>
                {on ? <span style={{ position: 'absolute', right: 12, top: 12, width: 22, height: 22, borderRadius: '50%', background: 'var(--green-700)', display: 'grid', placeItems: 'center' }}><Check size={12} weight="bold" color="#fff" /></span> : null}
                {chefImage && !imageErrors[chef.id] ? (
                  <img src={chefImage} alt={chefName} loading="lazy" onError={() => setImageErrors((prev) => ({ ...prev, [chef.id]: true }))} style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto', background: chefGradient, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 24 }}>{chefName.slice(0, 1)}</div>
                )}
                <div style={{ marginTop: 12, fontWeight: 700 }}>{chefName}</div>
                <TagPill style={{ marginTop: 8 }}>{chefCuisine}</TagPill>
                <p style={{ marginTop: 6, color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 13 }} className="clamp-2">{chefTagline}</p>
              </motion.button>
            );
          })}
        </div>

        <div style={{ marginTop: 32, maxWidth: 720 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="input-wrap" style={{ flex: 1 }}>
              <span className="left-icon"><FluentEmoji name="fork_knife" size={18} /></span>
              <input className="input" value={dish} onChange={(e) => setDish(e.target.value)} placeholder="Enter dish name..." />
            </div>
            <MotionButton icon={Sparkle} onClick={handleGenerate}>
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </MotionButton>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {suggestions.map((s) => <motion.button key={s} whileTap={{ scale: 0.96 }} onClick={() => setDish(s)} className="pill pill-neutral" style={{ textTransform: 'none', letterSpacing: 0 }}>{s}</motion.button>)}
          </div>
          {error ? <p style={{ marginTop: 12, color: 'var(--terracotta)' }}>{error}</p> : null}
        </div>

        {generatedRecipe ? (
          <section style={{ marginTop: 28, display: 'grid', gap: 14 }}>
            <article className="card" style={{ padding: 18 }}>
              <h3 style={{ fontSize: 22 }}>{generatedRecipe.greeting || 'Chef Recipe'}</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>{generatedRecipe.cookTime}</p>
              <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(generatedRecipe.tags || []).slice(0, 6).map((tag) => <TagPill key={tag}>{tag}</TagPill>)}
              </div>
            </article>

            <article className="card" style={{ padding: 18 }}>
              <h4>Ingredients</h4>
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {(generatedRecipe.ingredients || []).map((item, index) => (
                  <li key={`${item.item}-${index}`}>{item.item} - {item.quantity}</li>
                ))}
              </ul>
            </article>

            <article className="card" style={{ padding: 18 }}>
              <h4>Instructions</h4>
              <ol style={{ marginTop: 8, paddingLeft: 18 }}>
                {(generatedRecipe.instructions || []).map((step, index) => (
                  <li key={`${index}-${step}`} style={{ marginTop: 6 }}>{step}</li>
                ))}
              </ol>
            </article>
          </section>
        ) : null}
      </div>

      <style>{`
        .chef-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        @media (min-width: 768px) { .chef-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 1200px) { .chef-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
      `}</style>
    </div>
  );
};

export default Chef;
