import React, { useEffect, useMemo, useState } from 'react';

const FLUENT_BASE = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets';

const EMOJI_MAP = {
  avocado: 'Avocado/3D/avocado_3d.png',
  herb: 'Herb/3D/herb_3d.png',
  lemon: 'Lemon/3D/lemon_3d.png',
  tomato: 'Tomato/3D/tomato_3d.png',
  garlic: 'Garlic/3D/garlic_3d.png',
  bowl: 'Bowl with Spoon/3D/bowl_with_spoon_3d.png',
  pot: 'Pot of Food/3D/pot_of_food_3d.png',
  chef_hat: 'Cook/3D/cook_3d.png',
  money_bag: 'Money Bag/3D/money_bag_3d.png',
  smiling_hearts: 'Smiling Face with Hearts/3D/smiling_face_with_hearts_3d.png',
  confused: 'Confused Face/3D/confused_face_3d.png',
  relieved: 'Relieved Face/3D/relieved_face_3d.png',
  fire: 'Fire/3D/fire_3d.png',
  anxious: 'Anxious Face with Sweat/3D/anxious_face_with_sweat_3d.png',
  party: 'Partying Face/3D/partying_face_3d.png',
  thermometer: 'Face with Thermometer/3D/face_with_thermometer_3d.png',
  flex: 'Flexed Biceps/3D/flexed_biceps_3d.png',
  envelope_arrow: 'Envelope with Arrow/3D/envelope_with_arrow_3d.png',
  warning: 'Warning/3D/warning_3d.png',
  cooking: 'Cooking/3D/cooking_3d.png',
  fork_knife: 'Fork and Knife/3D/fork_and_knife_3d.png',
  taco: 'Taco/3D/taco_3d.png',
  noodles: 'Steaming Bowl/3D/steaming_bowl_3d.png',
  fondue: 'Fondue/3D/fondue_3d.png',
  pizza: 'Pizza/3D/pizza_3d.png',
  curry: 'Curry Rice/3D/curry_rice_3d.png',
  salad: 'Green Salad/3D/green_salad_3d.png',
  burger: 'Hamburger/3D/hamburger_3d.png',
  falafel: 'Falafel/3D/falafel_3d.png',
  sunrise: 'Sunrise/3D/sunrise_3d.png',
  sun: 'Sun/3D/sun_3d.png',
  fries: 'French Fries/3D/french_fries_3d.png',
  moon: 'Crescent Moon/3D/crescent_moon_3d.png',
  calendar: 'Calendar/3D/calendar_3d.png',
  spiral_calendar: 'Spiral Calendar/3D/spiral_calendar_3d.png',
  tear_calendar: 'Tear-Off Calendar/3D/tear-off_calendar_3d.png',
};

const FALLBACK_EMOJI_MAP = {
  avocado: '🥑',
  herb: '🌿',
  lemon: '🍋',
  tomato: '🍅',
  garlic: '🧄',
  bowl: '🥣',
  pot: '🍲',
  chef_hat: '👨‍🍳',
  money_bag: '💰',
  smiling_hearts: '🥰',
  confused: '😕',
  relieved: '😌',
  fire: '🔥',
  anxious: '😰',
  party: '🥳',
  thermometer: '🤒',
  flex: '💪',
  envelope_arrow: '📩',
  warning: '⚠️',
  cooking: '🍳',
  fork_knife: '🍽️',
  taco: '🌮',
  noodles: '🍜',
  fondue: '🫕',
  pizza: '🍕',
  curry: '🍛',
  salad: '🥗',
  burger: '🍔',
  falafel: '🧆',
  sunrise: '🌅',
  sun: '☀️',
  fries: '🍟',
  moon: '🌙',
  calendar: '📅',
  spiral_calendar: '🗓️',
  tear_calendar: '📆',
};

const FluentEmoji = ({ name, size = 24, alt, className = '' }) => {
  const path = EMOJI_MAP[name];
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [name]);

  const fallbackEmoji = useMemo(
    () => FALLBACK_EMOJI_MAP[name] || '🍽️',
    [name]
  );

  if (!path || imgFailed) {
    return (
      <span
        role="img"
        aria-label={alt || (name ? name.replaceAll('_', ' ') : 'emoji')}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          fontSize: Math.max(14, Math.round(size * 0.78)),
          lineHeight: 1,
        }}
      >
        {fallbackEmoji}
      </span>
    );
  }

  return (
    <img
      src={`${FLUENT_BASE}/${path}`}
      alt={alt || name.replaceAll('_', ' ')}
      width={size}
      height={size}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setImgFailed(true)}
    />
  );
};

export default FluentEmoji;
