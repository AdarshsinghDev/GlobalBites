import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Timer,
  Fire,
  Users,
  ChartBar,
  BookmarkSimple,
  Bookmark,
  ShoppingCart,
  CookingPot,
  Leaf,
  Lightbulb,
  Check,
  Plus,
  Minus,
} from '@phosphor-icons/react';
import FluentEmoji from '../../components/ui/FluentEmoji';
import TagPill from '../../components/ui/TagPill';
import MotionButton from '../../components/ui/MotionButton';
import api from '../../lib/api';
const HOME_RESULTS_CACHE_KEY = 'gb_home_results_cache_v2';

const normalizeIngredients = (value = '') =>
  String(value)
    .toLowerCase()
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .join(',');

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

const normalizeSteps = (steps) => {
  if (!Array.isArray(steps)) return [];
  return steps
    .map((step) => {
      if (typeof step === 'string') return step;
      if (step?.instruction) return step.instruction;
      if (step?.title) return step.title;
      return null;
    })
    .filter(Boolean);
};

const SelectedRecipe = () => {
  const location = useLocation();
  const { id } = useParams();

  const [saved, setSaved] = useState(false);
  const [servings, setServings] = useState(2);
  const [activeStep, setActiveStep] = useState(1);
  const [checked, setChecked] = useState([]);
  const [showMeta] = useState(true);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState('');
  const [detailedRecipe, setDetailedRecipe] = useState(null);

  const cached = readHomeCache();
  const preferredIngredients = location.state?.searchedIngredients || cached?.lastIngredients || '';
  const preferredKey = normalizeIngredients(preferredIngredients);
  const cachedBucket = preferredKey ? cached?.byIngredients?.[preferredKey] : null;
  const cachedRecipes = Array.isArray(cachedBucket?.recipes) ? cachedBucket.recipes : [];
  const summaryFromCache = cachedRecipes.find((item) => String(item.id) === String(id));
  const summaryFromState = location.state?.recipeSummary;
  const summaryRecipe = summaryFromState || summaryFromCache;
  const recipeName = summaryRecipe?.title || '';

  useEffect(() => {
    if (summaryRecipe?.servings) {
      setServings(summaryRecipe.servings);
    }
  }, [summaryRecipe]);

  const fetchRecipeDetails = useCallback(async () => {
    if (!recipeName) {
      setDetailError('Recipe source missing hai. Please search results se dobara open karo.');
      setDetailedRecipe(null);
      setDetailLoading(false);
      return;
    }

    try {
      setDetailLoading(true);
      setDetailError('');
      const { data } = await api.post('/api/recipe-ai/home-recipe', {
        recipe: recipeName,
      });
      setDetailedRecipe(data?.recipe || null);
      if (!data?.recipe) {
        setDetailError('Backend se recipe detail nahi aayi. Please retry karo.');
      }
    } catch (error) {
      setDetailError(
        error?.response?.data?.error ||
          'Detailed recipe load nahi ho paayi. Please retry karo.'
      );
      setDetailedRecipe(null);
    } finally {
      setDetailLoading(false);
    }
  }, [recipeName]);

  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails]);

  const tagList = Array.isArray(detailedRecipe?.tags) ? detailedRecipe.tags : [];
  const firstDietTag = tagList.find((tag) =>
    /veg|vegetarian|protein|healthy|comfort/i.test(String(tag))
  );

  const recipe = useMemo(() => {
    if (!detailedRecipe) return null;

    return {
      title: detailedRecipe.name || 'Recipe',
      cuisine: summaryRecipe?.cuisine || 'Indian',
      difficulty: detailedRecipe.difficulty || 'Medium',
      diet: firstDietTag ? String(firstDietTag).replace('#', '') : 'Balanced',
      time: Number(detailedRecipe.time) || 0,
      calories: Number(detailedRecipe.calories) || 0,
      people: Number(detailedRecipe.servings) || servings || 1,
      nutrition: {
        calories: Number(detailedRecipe?.nutritionPerServing?.calories) || 0,
        protein: Number(detailedRecipe?.nutritionPerServing?.protein) || 0,
        carbs: Number(detailedRecipe?.nutritionPerServing?.carbs) || 0,
        fat: Number(detailedRecipe?.nutritionPerServing?.fats) || 0,
      },
      chefTip: detailedRecipe.chefTip || 'No tip available',
    };
  }, [detailedRecipe, firstDietTag, servings, summaryRecipe?.cuisine]);

  const ingredients = useMemo(() => {
    if (!Array.isArray(detailedRecipe?.ingredients)) return [];
    return detailedRecipe.ingredients.map((item, index) => ({
      id: index + 1,
      qty: Number(item.amount) || 1,
      unit: item.unit || '',
      name: item.name || `Ingredient ${index + 1}`,
    }));
  }, [detailedRecipe?.ingredients]);

  const steps = useMemo(() => normalizeSteps(detailedRecipe?.steps), [detailedRecipe?.steps]);
  const isContentLoading = detailLoading || (!detailedRecipe && !detailError);

  const backIngredients = preferredIngredients;
  const backUrl = backIngredients
    ? `/home?ingredients=${encodeURIComponent(backIngredients)}`
    : '/home';

  return (
    <div className="page">
      <section
        className="hero-grain"
        style={{
          position: 'relative',
          height: 300,
          background: 'linear-gradient(135deg, #FDE8D0, #F5C6A0)',
        }}
      >
        <div style={{ position: 'absolute', top: 20, left: 20 }}>
          <Link to={backUrl}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
              style={{
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                padding: '10px 14px',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ArrowLeft size={16} /> All Recipes
            </motion.button>
          </Link>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <FluentEmoji name="curry" size={96} className="float" />
        </div>
        <h1
          style={{
            position: 'absolute',
            left: 24,
            bottom: 24,
            color: '#fff',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            fontSize: 'var(--text-h1)',
          }}
        >
          {detailedRecipe?.name || 'Loading recipe...'}
        </h1>
        <div style={{ position: 'absolute', right: 24, bottom: 24, display: 'flex', gap: 8 }}>
          {detailedRecipe ? (
            <>
              <TagPill>{recipe?.cuisine}</TagPill>
              <TagPill>{recipe?.difficulty}</TagPill>
              <TagPill>{recipe?.diet}</TagPill>
            </>
          ) : (
            <>
              <div className="skeleton" style={{ width: 72, height: 28, borderRadius: 999 }} />
              <div className="skeleton" style={{ width: 72, height: 28, borderRadius: 999 }} />
              <div className="skeleton" style={{ width: 72, height: 28, borderRadius: 999 }} />
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        {showMeta ? (
          <motion.div
            className="sticky-meta"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
          >
            <div
              className="container"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
              }}
            >
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <span className="number-text" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Timer size={18} weight="duotone" color="var(--green-700)" /> {recipe?.time ?? '--'} min
                </span>
                <span className="number-text" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Fire size={18} weight="duotone" color="var(--green-700)" /> {recipe?.calories ?? '--'} kcal
                </span>
                <span className="number-text" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Users size={18} weight="duotone" color="var(--green-700)" /> {recipe?.people ?? '--'} servings
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <ChartBar size={18} weight="duotone" color="var(--green-700)" /> {recipe?.difficulty ?? '--'}
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -1 }}
                onClick={() => setSaved((s) => !s)}
                className="btn btn-ghost"
              >
                {saved ? <Bookmark size={16} weight="fill" color="var(--green-700)" /> : <BookmarkSimple size={16} />}{' '}
                Save Recipe
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="section">
        <div className="container recipe-layout" style={{ display: 'grid', gap: 24 }}>
          <div style={{ display: 'grid', gap: 28 }}>
            {detailError ? (
              <div
                className="card"
                style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--error-bg)',
                  borderColor: 'rgba(201,97,74,0.3)',
                  color: 'var(--terracotta)',
                }}
              >
                <p>{detailError}</p>
                <div style={{ marginTop: 10 }}>
                  <MotionButton onClick={fetchRecipeDetails}>Retry</MotionButton>
                </div>
              </div>
            ) : null}

            {isContentLoading ? (
              <div className="card" style={{ padding: 18 }}>
                <div className="skeleton" style={{ width: 220, height: 24, borderRadius: 8 }} />
                <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="skeleton" style={{ height: 44, borderRadius: 10 }} />
                  ))}
                </div>
              </div>
            ) : (
              <section>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, fontStyle: 'italic', fontSize: 22 }}>
                  <ShoppingCart size={22} weight="duotone" color="var(--green-700)" /> What You'll Need
                </h2>
                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>Servings:</span>
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: '#fff' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="number-text" style={{ minWidth: 24, textAlign: 'center', color: 'var(--green-700)' }}>
                    {servings}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServings((s) => s + 1)}
                    style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: '#fff' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
                  {ingredients.map((item) => {
                    const on = checked.includes(item.id);
                    const adjusted = ((item.qty * servings) / Math.max(recipe?.people || 1, 1)).toFixed(
                      item.qty % 1 ? 1 : 0
                    );
                    return (
                      <motion.button
                        type="button"
                        key={item.id}
                        whileHover={{ x: 2 }}
                        onClick={() =>
                          setChecked((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((itemId) => itemId !== item.id)
                              : [...prev, item.id]
                          )
                        }
                        style={{ border: 0, background: 'transparent', padding: 0 }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            borderRadius: 'var(--radius-md)',
                            padding: '10px 12px',
                            background: on ? 'var(--green-50)' : '#fff',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <span
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 6,
                              border: '1px solid var(--border)',
                              background: on ? 'var(--green-700)' : '#fff',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            {on ? <Check size={12} weight="bold" color="#fff" /> : null}
                          </span>
                          <span className="number-text" style={{ color: 'var(--green-700)', fontSize: 14 }}>
                            {adjusted}
                            {item.unit ? ` ${item.unit}` : ''}
                          </span>
                          <span style={{ textDecoration: on ? 'line-through' : 'none', opacity: on ? 0.45 : 1 }}>
                            {item.name}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            )}

            {isContentLoading ? (
              <div className="card" style={{ padding: 18 }}>
                <div className="skeleton" style={{ width: 180, height: 24, borderRadius: 8 }} />
                <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="skeleton" style={{ height: 70, borderRadius: 10 }} />
                  ))}
                </div>
              </div>
            ) : (
              <section>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, fontStyle: 'italic', fontSize: 22 }}>
                  <CookingPot size={22} weight="duotone" color="var(--green-700)" /> Let's Cook
                </h2>
                <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
                  {steps.map((step, idx) => {
                    const active = activeStep === idx + 1;
                    return (
                      <motion.button
                        key={`${idx}-${step}`}
                        type="button"
                        onClick={() => setActiveStep(idx + 1)}
                        whileTap={{ scale: 0.99 }}
                        style={{ border: 0, background: 'transparent', textAlign: 'left', padding: 0 }}
                      >
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '36px 1fr',
                            gap: 10,
                            alignItems: 'flex-start',
                          }}
                        >
                          <motion.div
                            animate={{ scale: active ? 1.1 : 1 }}
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              background: 'var(--green-700)',
                              color: '#fff',
                              display: 'grid',
                              placeItems: 'center',
                              fontWeight: 700,
                            }}
                          >
                            {idx + 1}
                          </motion.div>
                          <div
                            style={{
                              border: '1px solid var(--border)',
                              borderLeft: '3px solid var(--green-700)',
                              borderRadius: 'var(--radius-md)',
                              padding: 18,
                              background: active ? 'var(--green-50)' : '#fff',
                              boxShadow: active ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                            }}
                          >
                            {step}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <aside
            style={{
              display: 'grid',
              gap: 12,
              alignContent: 'start',
              position: 'sticky',
              top: 88,
              height: 'max-content',
            }}
          >
            {isContentLoading ? (
              <div className="card" style={{ padding: 18 }}>
                <div className="skeleton" style={{ width: '100%', height: 140, borderRadius: 12 }} />
                <div className="skeleton" style={{ marginTop: 12, width: '100%', height: 80, borderRadius: 12 }} />
              </div>
            ) : (
              <>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <div
                    style={{
                      background: 'var(--green-700)',
                      color: '#fff',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Nutrition Per Serving
                    </span>
                    <Leaf size={18} weight="duotone" />
                  </div>
                  <div className="card" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: 18 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {Object.entries(recipe?.nutrition || {}).map(([k, v]) => (
                        <div key={k}>
                          <div className="number-text" style={{ fontSize: 28, fontWeight: 700 }}>
                            {v}
                          </div>
                          <div
                            style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}
                          >
                            {k}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--butter)',
                    border: '1px solid rgba(212,168,67,0.3)',
                    borderLeft: '4px solid var(--butter-dark)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: 'var(--butter-dark)',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      fontSize: 11,
                    }}
                  >
                    <Lightbulb size={16} weight="duotone" color="var(--butter-dark)" /> Chef's Tip
                  </div>
                  <p style={{ marginTop: 8, color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: 14 }}>
                    {recipe?.chefTip}
                  </p>
                </div>
              </>
            )}

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                borderRadius: 999,
                background: 'var(--cream-pink)',
                padding: '10px 18px',
              }}
            >
              <FluentEmoji name="smiling_hearts" size={20} />{' '}
              <span style={{ fontSize: 13, fontWeight: 500 }}>Perfect for a Cozy Evening</span>
            </div>
            <MotionButton icon={null}>Start Cook Mode</MotionButton>
          </aside>
        </div>
      </section>

      <style>{`
        .recipe-layout { grid-template-columns: 1fr; }
        @media (min-width: 1024px) { .recipe-layout { grid-template-columns: 60% 40%; align-items: start; } }
      `}</style>
    </div>
  );
};

export default SelectedRecipe;
