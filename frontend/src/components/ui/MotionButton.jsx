import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const MotionButton = ({
  children,
  variant = 'primary',
  icon,
  className = '',
  type = 'button',
  ...rest
}) => {
  const Icon = icon || ArrowRight;
  return (
    <motion.button
      type={type}
      className={`btn ${variant === 'ghost' ? 'btn-ghost' : 'btn-primary'} ${className}`.trim()}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...rest}
    >
      <span>{children}</span>
      {Icon ? <Icon size={16} /> : null}
    </motion.button>
  );
};

export default MotionButton;
