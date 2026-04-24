import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CaretRight, Sparkle, Timer, Leaf, Star, MagnifyingGlass } from '@phosphor-icons/react';
import FluentEmoji from '../../components/ui/FluentEmoji';
import RecipeCard from '../../components/ui/RecipeCard';
import MotionButton from '../../components/ui/MotionButton';
import { recipeSamples } from '../../data/mockData';
import api from '../../lib/api';
const HOME_RESULTS_CACHE_KEY = 'gb_home_results_cache_v2';

const normalizeIngredients = (value = '') =>
  String(value)
    .toLowerCase()
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .join(',');

const mapAiRecipeToCard = (recipe, idx) => {
  const timeValue = Number(String(recipe.cookingTime || '').match(/\d+/)?.[0] || 30);
  const tags = String(recipe.mainIngredients || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  return {
    id: `ai-${recipe.id || idx + 1}`,
    title: recipe.name || `AI Recipe ${idx + 1}`,
    description: recipe.description || 'Fresh AI-generated recipe suggestion.',
    cuisine: 'Indian',
    difficulty: 'Easy',
    tags: tags.length ? tags : ['AI', 'Quick', 'Homestyle'],
    time: timeValue,
    calories: 280 + idx * 20,
    servings: 2,
    emoji: 'curry',
  };
};

const readHomeCache = () => {
  try {
    const raw = localStorage.getItem(HOME_RESULTS_CACHE_KEY);
    if (!raw) return { lastIngredients: '', byIngredients: {} };
    const parsed = JSON.parse(raw);
    return {
      lastIngredients: parsed?.lastIngredients || '',
      byIngredients: parsed?.byIngredients || {},
    };
  } catch {
    return { lastIngredients: '', byIngredients: {} };
  }
};

const writeHomeCache = (payload) => {
  try {
    localStorage.setItem(HOME_RESULTS_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // no-op
  }
};

const getCachedBucket = (ingredients) => {
  const cache = readHomeCache();
  const key = normalizeIngredients(ingredients);
  const bucket = cache.byIngredients?.[key];
  return bucket && Array.isArray(bucket.recipes) && bucket.recipes.length > 0 ? bucket : null;
};

const saveCachedBucket = (ingredients, recipes) => {
  const key = normalizeIngredients(ingredients);
  if (!key) return;

  const cache = readHomeCache();
  const next = {
    lastIngredients: ingredients,
    byIngredients: {
      ...cache.byIngredients,
      [key]: {
        ingredients,
        recipes,
        savedAt: Date.now(),
      },
    },
  };
  writeHomeCache(next);
};

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const ingredientsFromUrl = searchParams.get('ingredients') || '';

  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(ingredientsFromUrl);
  const [resultRecipes, setResultRecipes] = useState(recipeSamples);
  const [searchedIngredients, setSearchedIngredients] = useState(
    ingredientsFromUrl || 'chicken, garlic, tomatoes'
  );
  const [error, setError] = useState('');
  const latestRequestRef = useRef(0);

  const filters = useMemo(
    () => [
      { label: 'All' },
      { label: 'Quick (<30min)', icon: Timer },
      { label: 'Vegetarian', icon: Leaf },
      { label: 'Budget' },
      { label: 'High Protein' },
      { label: 'Top Rated', icon: Star },
    ],
    []
  );

  const fetchRecipes = async (ingredients) => {
    const cleanIngredients = ingredients.trim();
    if (!cleanIngredients) return;
    const requestId = ++latestRequestRef.current;

    try {
      setLoading(true);
      setError('');

      const { data } = await api.post('/api/recipe-ai/get-recipes', {
        ingredients: cleanIngredients,
      });

      const mapped = Array.isArray(data?.recipes) ? data.recipes.map(mapAiRecipeToCard) : [];
      const nextRecipes = mapped.length > 0 ? mapped : [];
      const nextIngredients = data?.searchedIngredients || cleanIngredients;
      if (requestId !== latestRequestRef.current) return;

      setError('');
      setResultRecipes(nextRecipes);
      setSearchedIngredients(nextIngredients);
      saveCachedBucket(nextIngredients, nextRecipes);
    } catch (err) {
      if (requestId !== latestRequestRef.current) return;
      setError(
        err?.response?.data?.error ||
          'Recipe generate nahi ho paaya. Thodi der baad dobara try karo.'
      );
      setResultRecipes([]);
      setSearchedIngredients(cleanIngredients);
    } finally {
      if (requestId === latestRequestRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const cleanUrlIngredients = ingredientsFromUrl.trim();

    if (!cleanUrlIngredients) {
      latestRequestRef.current += 1;
      setLoading(false);
      const cache = readHomeCache();
      const last = cache.lastIngredients;
      const bucket = last ? getCachedBucket(last) : null;
      if (bucket) {
        setQuery(bucket.ingredients);
        setResultRecipes(bucket.recipes);
        setSearchedIngredients(bucket.ingredients);
        setError('');
      }
      return;
    }

    setQuery(cleanUrlIngredients);
    const bucket = getCachedBucket(cleanUrlIngredients);
    if (bucket) {
      latestRequestRef.current += 1;
      setLoading(false);
      setResultRecipes(bucket.recipes);
      setSearchedIngredients(bucket.ingredients);
      setError('');
      return;
    }

    fetchRecipes(cleanUrlIngredients);
  }, [ingredientsFromUrl]);

  const runSearch = () => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    const normalizedQuery = normalizeIngredients(cleanQuery);
    const normalizedUrlQuery = normalizeIngredients(ingredientsFromUrl);

    // Same URL query pe setSearchParams no-op hota hai, isliye direct refetch karo.
    if (normalizedQuery && normalizedQuery === normalizedUrlQuery) {
      fetchRecipes(cleanQuery);
      return;
    }

    const bucket = getCachedBucket(cleanQuery);
    if (bucket) {
      latestRequestRef.current += 1;
      setLoading(false);
      setResultRecipes(bucket.recipes);
      setSearchedIngredients(bucket.ingredients);
      setError('');
      saveCachedBucket(bucket.ingredients, bucket.recipes);
      setSearchParams({ ingredients: bucket.ingredients });
      return;
    }

    setSearchParams({ ingredients: cleanQuery });
  };

  return (
    <div className="page">
      <section style={{ borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13 }}>
            <Link to="/">Home</Link> <CaretRight size={12} /> <span>Results for "{searchedIngredients}"</span>
          </div>
          <h1 style={{ marginTop: 8, fontFamily: 'Lora, serif', fontWeight: 600, fontStyle: 'italic', fontSize: 20 }}>
            {resultRecipes.length} Recipes Found
          </h1>

          <div className="results-search" style={{ marginTop: 16, borderRadius: 999, height: 52, background: '#fff', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', padding: '0 8px 0 14px', gap: 8, maxWidth: 700 }}>
            <MagnifyingGlass size={18} color="var(--green-700)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  runSearch();
                }
              }}
              placeholder="Ingredients daalo... e.g. eggs, tomato, onion"
              style={{ border: 0, outline: 'none', background: 'transparent', flex: 1, fontSize: 14 }}
            />
            <MotionButton onClick={runSearch} icon={Sparkle} className="number-text">
              Find Recipes
            </MotionButton>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
            {filters.map((f) => {
              const Icon = f.icon;
              return (
                <motion.button
                  key={f.label}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -1 }}
                  onClick={() => setActive(f.label)}
                  className={`pill ${active === f.label ? 'pill-green' : 'pill-neutral'}`}
                  style={{ textTransform: 'none', letterSpacing: 0, whiteSpace: 'nowrap' }}
                >
                  {Icon ? <Icon size={14} /> : null}
                  {f.label}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {loading ? (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--green-50)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green-700)', fontWeight: 500 }}>
                <Sparkle size={18} weight="duotone" className="spin-slow" /> AI aapke liye recipes bana raha hai...
              </motion.div>
            ) : null}
          </AnimatePresence>

          {error ? (
            <div className="card" style={{ marginTop: 14, borderRadius: 'var(--radius-md)', padding: 12, background: 'var(--error-bg)', borderColor: 'rgba(201,97,74,0.3)', color: 'var(--terracotta)' }}>
              {error}
            </div>
          ) : null}

          <div style={{ marginTop: 20 }} className="grid-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card recipe-card">
                    <div className="skeleton" style={{ height: 180 }} />
                    <div style={{ padding: 18 }}>
                      <div className="skeleton" style={{ height: 20, borderRadius: 8, marginBottom: 8 }} />
                      <div className="skeleton" style={{ height: 14, borderRadius: 8, marginBottom: 12 }} />
                      <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 8 }} />
                    </div>
                  </div>
                ))
              : resultRecipes.map((recipe, idx) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    index={idx}
                    onClick={() =>
                      navigate(`/recipe/${recipe.id}`, {
                        state: {
                          recipeSummary: recipe,
                          searchedIngredients,
                        },
                      })
                    }
                  />
                ))}
          </div>

          {!loading && resultRecipes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <FluentEmoji name="confused" size={96} />
              <h2 style={{ marginTop: 12, fontSize: 28 }}>Nothing Found</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Try adding more ingredients or reducing filters.</p>
              <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 10 }}>
                <MotionButton variant="ghost" icon={null} onClick={() => setQuery('')}>
                  Clear
                </MotionButton>
                <MotionButton onClick={runSearch}>Try Again</MotionButton>
              </div>
            </div>
          ) : null}

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
            <MotionButton onClick={runSearch} icon={Sparkle}>Refresh Results</MotionButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
