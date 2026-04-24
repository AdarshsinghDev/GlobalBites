import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkle } from '@phosphor-icons/react';
import FluentEmoji from '../../components/ui/FluentEmoji';
import MotionButton from '../../components/ui/MotionButton';
import RecipeCard from '../../components/ui/RecipeCard';
import { recipeSamples } from '../../data/mockData';
import api from '../../lib/api';

const mapBudgetRecipeToCard = (recipe, index) => ({
  id: `budget-${index + 1}`,
  title: recipe?.name || `Budget Recipe ${index + 1}`,
  description: recipe?.description || 'Smart budget meal suggestion',
  cuisine: 'Indian',
  difficulty: recipe?.difficulty || 'Easy',
  tags: ['Budget', 'Meal Plan', 'Smart Spend'],
  time: Number(recipe?.time) || 30,
  calories: Number(recipe?.calories) || 300,
  servings: Number(recipe?.servings) || 2,
  emoji: 'curry',
  price: Number(recipe?.totalPrice) || 0,
});

const Budget = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState('150');
  const [mealType, setMealType] = useState('Lunch');
  const [frequency, setFrequency] = useState('Daily');
  const [prefs, setPrefs] = useState(['Veg']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [budgetRecipes, setBudgetRecipes] = useState(recipeSamples);

  const presets = ['100', '200', '500', '1000'];
  const options = useMemo(() => ({
    meal: [{ key: 'Breakfast', icon: 'sunrise' }, { key: 'Lunch', icon: 'sun' }, { key: 'Snacks', icon: 'fries' }, { key: 'Dinner', icon: 'moon' }],
    freq: [{ key: 'Daily', icon: 'calendar' }, { key: 'Weekly', icon: 'spiral_calendar' }, { key: 'Monthly', icon: 'tear_calendar' }],
    pref: ['Light', 'Spicy', 'Veg', 'Non-Veg', 'Healthy', 'Quick'],
  }), []);

  const togglePref = (p) => setPrefs((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  const fetchBudgetRecipes = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await api.post(
        '/api/recipe-ai/budget',
        {
          budget: Number(budget) || 0,
          meal: mealType,
          frequency,
          preference: prefs.join(', '),
        },
        { timeout: 60000 }
      );

      const recipes = Array.isArray(data?.recipes) ? data.recipes : [];
      const mapped = recipes.map(mapBudgetRecipeToCard);
      if (mapped.length === 0) {
        setError('No budget recipes received. Try different options.');
        return;
      }
      setBudgetRecipes(mapped);
    } catch (apiError) {
      setError(apiError?.response?.data?.error || 'Budget recipes fetch failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page section">
      <div className="container" style={{ textAlign: 'center' }}>
        <FluentEmoji name="money_bag" size={64} />
        <h1 className="text-h1" style={{ marginTop: 8 }}>Eat Well. Spend Less.</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>Smart meal planning within any budget.</p>

        <div className="card budget-panel" style={{ maxWidth: 580, margin: '28px auto 0', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', padding: 40, textAlign: 'left' }}>
          <div>
            <div className="text-label">Your Budget</div>
            <div style={{ marginTop: 8, border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', height: 56, display: 'flex', overflow: 'hidden' }}>
              <span className="number-text" style={{ width: 64, background: 'var(--green-50)', borderRight: '1px solid var(--border)', display: 'grid', placeItems: 'center', color: 'var(--green-700)', fontWeight: 700, fontSize: 18 }}>Rs</span>
              <input value={budget} onChange={(e) => setBudget(e.target.value)} style={{ border: 0, outline: 'none', flex: 1, padding: '0 16px', fontFamily: 'Space Mono, monospace', fontWeight: 700 }} />
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {presets.map((p) => <motion.button key={p} type="button" whileTap={{ scale: 0.96 }} onClick={() => setBudget(p)} className={`pill ${budget === p ? 'pill-green' : 'pill-neutral'}`} style={{ textTransform: 'none', letterSpacing: 0 }}>Rs {p}</motion.button>)}
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div className="text-label">Meal Type</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {options.meal.map((m) => (
                <motion.button key={m.key} whileTap={{ scale: 0.96 }} onClick={() => setMealType(m.key)} style={{ border: 0, borderRadius: 999, padding: '8px 14px', background: mealType === m.key ? 'var(--green-700)' : 'var(--bg-muted)', color: mealType === m.key ? '#fff' : 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <FluentEmoji name={m.icon} size={16} /> {m.key}
                </motion.button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div className="text-label">Frequency</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {options.freq.map((m) => (
                <motion.button key={m.key} whileTap={{ scale: 0.96 }} onClick={() => setFrequency(m.key)} style={{ border: 0, borderRadius: 999, padding: '8px 14px', background: frequency === m.key ? 'var(--green-700)' : 'var(--bg-muted)', color: frequency === m.key ? '#fff' : 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <FluentEmoji name={m.icon} size={16} /> {m.key}
                </motion.button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div className="text-label">Preference</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {options.pref.map((p) => (
                <motion.button key={p} whileTap={{ scale: 0.96 }} onClick={() => togglePref(p)} style={{ border: 0, borderRadius: 999, padding: '8px 14px', background: prefs.includes(p) ? 'var(--green-700)' : 'var(--bg-muted)', color: prefs.includes(p) ? '#fff' : 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {prefs.includes(p) ? <Check size={12} /> : null}
                  {p}
                </motion.button>
              ))}
            </div>
          </div>

          <MotionButton className="number-text" icon={Sparkle} style={{ width: '100%', marginTop: 24 }} onClick={fetchBudgetRecipes}>{loading ? 'Finding...' : 'Find Budget Recipes'}</MotionButton>
          {error ? <p style={{ marginTop: 10, color: 'var(--terracotta)', textAlign: 'center' }}>{error}</p> : null}
          <p style={{ marginTop: 8, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>Prices are estimates based on average Indian market rates.</p>
        </div>

        <div className="budget-summary" style={{ marginTop: 24, border: '1px solid var(--green-100)', background: 'var(--green-50)', borderRadius: 'var(--radius-md)', padding: '12px 20px', textAlign: 'left' }}>
          Showing meals under Rs {budget} - {frequency} - {mealType} - {prefs.join(', ')}
        </div>

        <div style={{ marginTop: 16 }} className="grid-3">
          {budgetRecipes.map((r, i) => (
            <div key={r.id} style={{ position: 'relative' }}>
              <div className="pill pill-green number-text" style={{ position: 'absolute', top: 12, right: 12, zIndex: 3, textTransform: 'none', letterSpacing: 0 }}>Rs {r.price || 0}</div>
              <RecipeCard
                recipe={r}
                index={i}
                onClick={() =>
                  navigate(`/recipe/${r.id}`, {
                    state: {
                      recipeSummary: r,
                      searchedIngredients: `${mealType}, ${prefs.join(', ')}`,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;
