import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Warning, Sparkle, MagnifyingGlass, CircleNotch } from '@phosphor-icons/react';
import FluentEmoji from '../../components/ui/FluentEmoji';
import MotionButton from '../../components/ui/MotionButton';
import api from '../../lib/api';

const getBmiCategory = (value) => {
  if (value < 18.5) return 'Underweight';
  if (value < 25) return 'Normal';
  if (value < 30) return 'Overweight';
  return 'Obese';
};

const KnowledgeHub = () => {
  const [tab, setTab] = useState('mood');
  const [mood, setMood] = useState('Cozy');
  const [moodNote, setMoodNote] = useState('');
  const [scienceQuery, setScienceQuery] = useState('');
  const [comboQuery, setComboQuery] = useState('');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('65');
  const [age, setAge] = useState('');
  const [healthGoal, setHealthGoal] = useState('');

  const [moodResult, setMoodResult] = useState(null);
  const [scienceResult, setScienceResult] = useState(null);
  const [comboResult, setComboResult] = useState(null);
  const [healthResult, setHealthResult] = useState(null);

  const [loading, setLoading] = useState({
    mood: false,
    science: false,
    combo: false,
    health: false,
  });
  const [error, setError] = useState({
    mood: '',
    science: '',
    combo: '',
    health: '',
  });

  const tabs = [
    { id: 'mood', label: 'Mood', icon: 'relieved' },
    { id: 'science', label: 'Science', icon: 'garlic' },
    { id: 'combo', label: "Don't Combo", icon: 'warning' },
    { id: 'health', label: 'Health', icon: 'flex' },
  ];

  const moods = [
    { name: 'Cozy', emoji: 'relieved' },
    { name: 'Energetic', emoji: 'fire' },
    { name: 'Stressed', emoji: 'anxious' },
    { name: 'Celebratory', emoji: 'party' },
    { name: 'Under the Weather', emoji: 'thermometer' },
    { name: 'Focused', emoji: 'flex' },
  ];

  const setTabLoading = (mode, value) => {
    setLoading((prev) => ({ ...prev, [mode]: value }));
  };

  const setTabError = (mode, message) => {
    setError((prev) => ({ ...prev, [mode]: message }));
  };

  const askKnowledgeAI = async (mode, payload, onSuccess) => {
    setTabLoading(mode, true);
    setTabError(mode, '');

    try {
      const { data } = await api.post('/api/recipe-ai/knowledge-guide', {
        mode,
        ...payload,
      });
      if (!data?.result) {
        throw new Error('AI response missing');
      }
      onSuccess(data.result);
    } catch (apiError) {
      const message =
        apiError?.response?.data?.error ||
        'AI response generate nahi hua. Please retry karo.';
      setTabError(mode, message);
    } finally {
      setTabLoading(mode, false);
    }
  };

  const handleMoodAsk = () => {
    askKnowledgeAI(
      'mood',
      {
        mood,
        details: moodNote,
      },
      setMoodResult
    );
  };

  const handleScienceAsk = () => {
    const query = scienceQuery.trim();
    if (!query) {
      setTabError('science', 'Pehle ingredient/combo query likho.');
      return;
    }
    askKnowledgeAI('science', { query }, setScienceResult);
  };

  const handleComboAsk = () => {
    const combo = comboQuery.trim();
    if (!combo) {
      setTabError('combo', 'Pehle combo likho jise verify karna hai.');
      return;
    }
    askKnowledgeAI('combo', { combo }, setComboResult);
  };

  const handleHealthAsk = () => {
    const h = Number(height);
    const w = Number(weight);
    askKnowledgeAI(
      'health',
      {
        goal: healthGoal,
        height: Number.isFinite(h) ? h : undefined,
        weight: Number.isFinite(w) ? w : undefined,
        age: age ? Number(age) : undefined,
      },
      setHealthResult
    );
  };

  const bmi =
    Number(height) > 0 && Number(weight) > 0
      ? Number((Number(weight) / ((Number(height) / 100) * (Number(height) / 100))).toFixed(1))
      : null;

  return (
    <div className="page">
      <section style={{ position: 'sticky', top: 64, zIndex: 80, background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '10px 0' }}>
          {tabs.map((t) => (
            <motion.button key={t.id} whileTap={{ scale: 0.96 }} onClick={() => setTab(t.id)} style={{ border: 0, borderBottom: tab === t.id ? '3px solid var(--green-700)' : '3px solid transparent', background: 'transparent', color: tab === t.id ? 'var(--green-700)' : 'var(--text-secondary)', padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', fontWeight: tab === t.id ? 600 : 500, fontFamily: tab === t.id ? 'Lora, serif' : 'Outfit, sans-serif', fontStyle: tab === t.id ? 'italic' : 'normal' }}>
              <FluentEmoji name={t.icon} size={18} /> {t.label}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {tab === 'mood' ? (
            <>
              <h2 className="text-h2">Mood ke according AI meal guidance</h2>
              <div style={{ marginTop: 20 }} className="mood-grid">
                {moods.map((m, i) => (
                  <motion.button key={m.name} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} onClick={() => setMood(m.name)} className="card" style={{ padding: '28px 20px', textAlign: 'center', borderRadius: 'var(--radius-xl)', borderColor: mood === m.name ? 'var(--green-500)' : 'var(--border)', background: mood === m.name ? 'var(--green-50)' : '#fff' }}>
                    <FluentEmoji name={m.emoji} size={72} />
                    <div style={{ marginTop: 12, fontWeight: 700 }}>{m.name}</div>
                  </motion.button>
                ))}
              </div>
              <textarea className="input" value={moodNote} onChange={(e) => setMoodNote(e.target.value)} style={{ marginTop: 18, height: 90, padding: 14 }} placeholder="Apna exact mood details likho..." />
              <div style={{ marginTop: 10 }}>
                <MotionButton onClick={handleMoodAsk} icon={loading.mood ? CircleNotch : Sparkle}>
                  {loading.mood ? 'AI soch raha hai...' : 'Ask AI for Mood Plan'}
                </MotionButton>
              </div>
              {error.mood ? <p style={{ marginTop: 10, color: 'var(--terracotta)' }}>{error.mood}</p> : null}
              {moodResult ? (
                <div className="card" style={{ marginTop: 14, padding: 16, borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontWeight: 700 }}>{moodResult.title || `Recommended for ${mood}`}</div>
                  <p style={{ marginTop: 8, color: 'var(--text-secondary)' }}>{moodResult.summary}</p>
                  <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                    {(moodResult.bullets || []).map((item) => (
                      <div key={item} style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 'var(--radius-md)', padding: 10 }}>{item}</div>
                    ))}
                  </div>
                  {moodResult.caution ? <p style={{ marginTop: 10, color: 'var(--warning-text)' }}>{moodResult.caution}</p> : null}
                </div>
              ) : null}
            </>
          ) : null}

          {tab === 'science' ? (
            <>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', border: '1px solid var(--border)', borderRadius: 999, padding: '10px 14px', background: '#fff' }}>
                <MagnifyingGlass size={18} color="var(--green-700)" />
                <input value={scienceQuery} onChange={(e) => setScienceQuery(e.target.value)} placeholder="Example: garlic + honey, tea after lunch, haldi milk..." style={{ border: 0, outline: 'none', flex: 1 }} />
              </div>
              <div style={{ marginTop: 10 }}>
                <MotionButton onClick={handleScienceAsk} icon={loading.science ? CircleNotch : Sparkle}>
                  {loading.science ? 'AI check kar raha hai...' : 'Ask AI Science'}
                </MotionButton>
              </div>
              {error.science ? <p style={{ marginTop: 10, color: 'var(--terracotta)' }}>{error.science}</p> : null}
              {scienceResult ? (
                <div className="card" style={{ marginTop: 14, padding: 14, borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>{scienceResult.title}</h3>
                    <span className={`pill ${scienceResult.verdict === 'Healthy' ? 'pill-green' : 'pill-neutral'}`} style={{ textTransform: 'none', letterSpacing: 0 }}>
                      {scienceResult.verdict || 'Neutral'}
                    </span>
                  </div>
                  <p style={{ marginTop: 8, color: 'var(--text-secondary)' }}>{scienceResult.summary}</p>
                  <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                    {(scienceResult.bullets || []).map((item) => (
                      <div key={item} style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 'var(--radius-md)', padding: 10 }}>{item}</div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          {tab === 'combo' ? (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', border: '1px solid var(--border)', borderRadius: 999, padding: '10px 14px', background: '#fff' }}>
                <MagnifyingGlass size={18} color="var(--green-700)" />
                <input value={comboQuery} onChange={(e) => setComboQuery(e.target.value)} placeholder="Combo likho, eg: fish + milk" style={{ border: 0, outline: 'none', flex: 1 }} />
              </div>
              <MotionButton onClick={handleComboAsk} icon={loading.combo ? CircleNotch : Sparkle}>
                {loading.combo ? 'AI evaluate kar raha hai...' : "Ask AI Don't Combo"}
              </MotionButton>
              {error.combo ? <p style={{ color: 'var(--terracotta)' }}>{error.combo}</p> : null}
              {comboResult ? (
                <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--terracotta)', borderRadius: 'var(--radius-lg)', background: 'var(--error-bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--terracotta)', fontWeight: 700 }}>
                    <Warning size={18} weight="duotone" /> {comboResult.title}
                  </div>
                  <p style={{ marginTop: 6, color: 'var(--text-secondary)' }}>{comboResult.risk}</p>
                  <p style={{ marginTop: 6, color: 'var(--text-secondary)' }}>{comboResult.why}</p>
                  <div style={{ marginTop: 8, borderLeft: '4px solid var(--green-700)', background: 'var(--green-50)', padding: 10, borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={16} weight="duotone" color="var(--green-700)" /> Better option: {comboResult.betterOption}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {tab === 'health' ? (
            <div className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 22 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input className="input" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (cm)" />
                <input className="input" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" />
              </div>
              <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
                <input className="input" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age (optional)" />
                <textarea className="input" value={healthGoal} onChange={(e) => setHealthGoal(e.target.value)} placeholder="Health goal likho: fat loss, digestion, muscle gain, sugar control..." style={{ minHeight: 90 }} />
              </div>
              <div style={{ marginTop: 10 }}>
                <MotionButton onClick={handleHealthAsk} icon={loading.health ? CircleNotch : Sparkle}>
                  {loading.health ? 'AI health plan bana raha hai...' : 'Ask AI Health Plan'}
                </MotionButton>
              </div>
              {error.health ? <p style={{ marginTop: 10, color: 'var(--terracotta)' }}>{error.health}</p> : null}

              {bmi ? (
                <div style={{ marginTop: 12, color: 'var(--text-secondary)' }}>
                  Current BMI: <strong>{bmi}</strong> ({getBmiCategory(bmi)})
                </div>
              ) : null}

              {healthResult ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 700, color: 'var(--green-700)' }}>{healthResult.title}</div>
                  <p style={{ marginTop: 6, color: 'var(--text-secondary)' }}>{healthResult.summary}</p>
                  <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                    {(healthResult.bullets || []).map((item) => (
                      <div key={item} style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 'var(--radius-md)', padding: 10 }}>{item}</div>
                    ))}
                  </div>
                  {healthResult.caution ? <p style={{ marginTop: 10, color: 'var(--warning-text)' }}>{healthResult.caution}</p> : null}
                </motion.div>
              ) : (
                <p style={{ marginTop: 12, color: 'var(--text-secondary)' }}>Details dalke AI health guidance generate karo.</p>
              )}
            </div>
          ) : null}
        </div>
      </section>

      <style>{`
        .mood-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      `}</style>
    </div>
  );
};

export default KnowledgeHub;
