import { useState } from 'react';
import { motion } from 'framer-motion';
import { PencilSimple, CookingPot, BookmarkSimple, CurrencyDollar, Lock, Warning } from '@phosphor-icons/react';
import FluentEmoji from '../../components/ui/FluentEmoji';
import MotionButton from '../../components/ui/MotionButton';
import RecipeCard from '../../components/ui/RecipeCard';
import { recipeSamples } from '../../data/mockData';

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="page section">
      <div className="container" style={{ display: 'grid', gap: 20 }}>
        <section className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 32, position: 'relative' }}>
          <motion.button whileTap={{ scale: 0.96 }} className="btn btn-ghost" style={{ position: 'absolute', top: 22, right: 22 }}><PencilSimple size={16} /> Edit Profile</motion.button>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-700), var(--green-500))', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'Lora, serif', fontWeight: 700, fontSize: 28, position: 'relative' }}>
              A
              <span style={{ position: 'absolute', right: 3, bottom: 3, width: 12, height: 12, borderRadius: '50%', background: 'var(--green-500)', border: '2px solid #fff' }} />
            </div>
            <div>
              <h1 style={{ fontSize: 24 }}>Adarsh</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>adarsh@example.com</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Member since Jan 2025</p>
              <span className="pill pill-green" style={{ marginTop: 8 }}>Home Cook</span>
            </div>
          </div>
        </section>

        <section className="grid-3">
          {[{ icon: CookingPot, label: 'Recipes Generated', value: 142, bg: 'var(--green-100)' }, { icon: BookmarkSimple, label: 'Saved Recipes', value: 38, bg: 'var(--butter)' }, { icon: CurrencyDollar, label: 'Budget Meals', value: 54, bg: 'var(--cream-pink)' }].map((s) => {
            const StatIcon = s.icon;
            return (
            <motion.article key={s.label} whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }} className="card" style={{ padding: 24, borderRadius: 'var(--radius-lg)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: s.bg, display: 'grid', placeItems: 'center' }}><StatIcon size={28} weight="duotone" color="var(--green-700)" /></div>
              <div className="number-text" style={{ marginTop: 12, fontSize: 32 }}>{s.value}</div>
              <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: 13, fontWeight: 500 }}>{s.label}</div>
            </motion.article>
          )})}
        </section>

        <section>
          <h2 className="text-h2">Saved Recipes</h2>
          <div className="grid-3" style={{ marginTop: 12 }}>
            {recipeSamples.slice(0, 3).map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
          </div>
        </section>

        <section className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 24 }}>
          <h3 style={{ fontFamily: 'Lora, serif', fontSize: 24 }}>Settings</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 10, maxWidth: 520 }}>
            <input className="input" defaultValue="Adarsh" style={{ paddingLeft: 16 }} />
            <div className="input-wrap"><span className="left-icon"><Lock size={14} /></span><input className="input" value="adarsh@example.com" readOnly /></div>
          </div>
          <MotionButton style={{ marginTop: 12 }}>Save Changes</MotionButton>

          <div style={{ marginTop: 28, border: '1px solid rgba(201,97,74,0.3)', background: 'var(--error-bg)', borderRadius: 'var(--radius-xl)', padding: 24 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--terracotta)', fontWeight: 700 }}><Warning size={18} weight="duotone" color="var(--terracotta)" /> Danger Zone</div>
            <p style={{ marginTop: 6, color: 'var(--text-secondary)' }}>Delete your account permanently and remove all saved data.</p>
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => setOpenModal(true)} className="btn btn-ghost" style={{ marginTop: 10, borderColor: 'var(--terracotta)', color: 'var(--terracotta)' }}>Delete Account</motion.button>
          </div>
        </section>
      </div>

      {openModal ? (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,24,20,0.4)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 120 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ width: 'min(440px, 90vw)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-hover)', padding: 24, textAlign: 'center' }}>
            <FluentEmoji name="warning" size={64} />
            <h3 style={{ marginTop: 10, fontSize: 24 }}>Delete your account?</h3>
            <p style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: 14 }}>This will permanently delete all your saved recipes and data.</p>
            <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => setOpenModal(false)} className="btn btn-ghost" style={{ width: '100%' }}>Cancel</motion.button>
              <motion.button whileTap={{ scale: 0.96 }} className="btn" style={{ width: '100%', background: 'var(--terracotta)', color: '#fff' }}>Yes, Delete</motion.button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
