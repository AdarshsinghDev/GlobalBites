# GlobalBites - Ultra-Premium Redesign

A complete redesign of GlobalBites using the "Organic Modern Editorial" design system.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on: http://localhost:5174

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Typography
- **Display/Hero**: Lora (serif) - elegant, editorial, warm
- **UI/Body**: Outfit (sans-serif) - geometric, modern, Gen-Z clean
- **Numbers/Stats**: Space Mono (monospace) - technical precision

### Color Palette
- **Base**: `#F7F4EF` (warm parchment)
- **Primary Green**: `#1A6B3C`
- **Accents**: Butter (`#F5E6B2`), Terracotta (`#C9614A`), Cream Pink (`#F2DDD6`)

### Icons & Emojis
- **UI Icons**: Phosphor Icons (@phosphor-icons/react)
- **Decorative Emojis**: Fluent Emoji PNGs (Microsoft CDN)
- **NO default browser/OS emoji rendering**

### Animations
- **Library**: Framer Motion
- **Easing**: Custom cubic-bezier(0.22, 1, 0.36, 1)
- **All interactive elements**: whileHover, whileTap animations

## 📁 Project Structure

```
frontend/src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Main navigation with mobile menu
│   └── ui/             # Atomic UI components
│       └── FluentEmoji.jsx  # Fluent Emoji helper
├── page/               # Page components
│   ├── landing/        # Home/Hero page
│   ├── signup/         # Auth - Signup with OTP
│   ├── login/          # Auth - Login
│   ├── home/           # Recipe results
│   ├── selectedRecipe/  # Single recipe detail
│   ├── features/       # AI Chef, Budget modules
│   ├── knowledge/      # Knowledge Hub
│   └── profile/        # User profile
├── App.jsx             # Main router
└── index.css           # Global styles + design system
```

## 🔧 Key Features

### ✅ Implemented
1. **Complete Design System** - All typography, colors, spacing
2. **All 8 Pages** - Fully redesigned with premium aesthetics
3. **Responsive Design** - Mobile-first, all screen sizes
4. **Animations** - Framer Motion on all interactive elements
5. **Icon System** - Phosphor icons + Fluent Emoji PNGs
6. **Performance** - Optimized builds, code splitting

### 🎯 Design Compliance
- ✅ ZERO default browser/OS emoji rendering
- ✅ ZERO generic AI design patterns
- ✅ ALL icons are Phosphor
- ✅ Grain overlay on hero sections
- ✅ Lora font for ALL headings
- ✅ Space Mono for ALL numbers, prices, OTP
- ✅ Cards use gradient headers (cuisine-based)

## 🛠️ Troubleshooting

### Vite Dependency Errors
If you see "Outdated Optimize Dep" errors:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules && npm install
```

### Build Errors
If build fails:
1. Check for duplicate keys in FluentEmoji.jsx
2. Verify Phosphor icon names are correct
3. Ensure all imports are valid

## 📦 Dependencies

### Core
- `react` ^19.1.0
- `react-router-dom` ^7.6.3
- `framer-motion` ^11.18.0 (animations)
- `@phosphor-icons/react` ^2.1.1 (icons)
- `react-fast-marquee` ^1.6.0 (scrolling strips)

### Development
- `vite` ^7.0.3 (build tool)
- `tailwindcss` ^3.4.17 (styling)
- `autoprefixer` ^10.4.21
- `postcss` ^8.5.6

## 🎨 Design Philosophy

GlobalBites now embodies the "Organic Modern Editorial" aesthetic:
- **Warm, tactile, alive** - Like a premium food magazine
- **Bon Appétit × Linear × Notion** - Editorial meets modern UI
- **SuperDesign's "Organic Modern"** - Natural, flowing forms
- **"Soft Gen-Z Wellness"** - Approachable, healthy, modern

The redesign transforms GlobalBites from a basic web app into a premium culinary experience that feels like a high-end food magazine with AI superpowers.