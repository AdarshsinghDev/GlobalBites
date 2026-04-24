import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Fire, Users, ArrowRight } from '@phosphor-icons/react';
import FluentEmoji from './FluentEmoji';
import TagPill from './TagPill';
import { cuisineGradients } from '../../data/mockData';

const RecipeCard = ({ recipe, index = 0, onClick }) => {
  const gradient = cuisineGradients[recipe.cuisine] || cuisineGradients.default;

  return (
    <motion.article
      className="card recipe-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: 'var(--shadow-hover)' }}
    >
      <div className={`recipe-gradient ${gradient}`}>
        <FluentEmoji name={recipe.emoji || 'cooking'} size={72} className="float" />
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          <TagPill>{recipe.difficulty}</TagPill>
        </div>
      </div>
      <div style={{ padding: 18 }}>
        <h3 style={{ fontFamily: 'Lora, serif', fontWeight: 600, fontSize: 18 }} className="clamp-2">{recipe.title}</h3>
        <p className="clamp-2" style={{ marginTop: 6, color: 'var(--text-secondary)', fontSize: 13 }}>{recipe.description}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
          {recipe.tags?.slice(0, 3).map((tag) => <TagPill key={tag} tone="neutral">{tag}</TagPill>)}
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Space Mono, monospace' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Timer size={14} /> {recipe.time} min</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Fire size={14} /> {recipe.calories} kcal</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Users size={14} /> {recipe.servings}</span>
        </div>
        <motion.button
          type="button"
          onClick={onClick}
          className="btn btn-ghost"
          style={{ width: '100%', marginTop: 14 }}
          whileHover={{ y: -2, background: 'var(--green-700)', color: '#fff', borderColor: 'transparent' }}
          whileTap={{ scale: 0.96 }}
        >
          <span>View Recipe</span>
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.article>
  );
};

export default RecipeCard;
