# INTERNSHIP / PROJECT REPORT
## GlobalBites: AI-Powered Recipe Recommendation and Culinary Assistant (MERN + Generative AI)

---

### Cover Page

**Title of the Project:** GlobalBites: AI-Powered Recipe Recommendation and Culinary Assistant  
**Submitted by:** <Your Full Name>  
**Enrollment / Roll No.:** <Enrollment No.>  
**Program / Semester:** <Program>, <Semester>  
**Institute:** <Institute Name>  
**Department:** <Department Name>  
**Internship / Project Guide (Institute):** <Guide Name, Designation>  
**Industry Mentor / Supervisor:** <Mentor Name, Company>  
**Company / Organization:** <Company Name>  
**Internship Duration:** <Start Date> to <End Date>  
**Academic Year:** <YYYY-YYYY>  

---

### Certificate of Internship

This is to certify that **<Your Full Name>**, Enrollment No. **<Enrollment No.>**, has successfully completed the internship/project titled **"GlobalBites: AI-Powered Recipe Recommendation and Culinary Assistant"** during the period **<Start Date> to <End Date>** under the guidance of **<Mentor Name>** at **<Company Name>**.

**Intern / Student Signature:** ____________________  
**Industry Mentor / Supervisor:** ____________________  
**Date:** ____________________  
**Company Seal (if applicable):** ____________________  

---

### Internship Completion Certificate

This is to certify that **<Your Full Name>** has completed the internship/project work and submitted the report as per the requirements of **<Institute Name>**. The work carried out is found to be satisfactory.

**Project Guide (Institute):** ____________________  
**Head of Department:** ____________________  
**Date:** ____________________  
**Institute Seal:** ____________________  

---

### Acknowledgement

I would like to express my sincere gratitude to **<Company Name>** for providing me with the opportunity to work on this project and gain valuable hands-on experience. I am thankful to **<Industry Mentor Name>** for continuous guidance, technical support, and constructive feedback throughout the internship.

I also extend my heartfelt thanks to **<Institute Guide Name>** and the faculty members of **<Department Name, Institute Name>** for their encouragement and mentorship. Finally, I would like to thank my peers and family for their support and motivation during the completion of this work.

**<Your Full Name>**  

---

### Abstract

GlobalBites is a web-based culinary assistant designed to simplify everyday meal planning and recipe discovery using **AI-driven recipe generation** and a user-friendly interface. The system enables users to search recipes using available ingredients, generate detailed step-by-step recipes, and explore budget-aware meal recommendations. Additionally, the platform introduces engaging features such as an AI Chef persona that generates recipes in a chef-specific style, and knowledge-based modules like mood-based suggestions and food-combination awareness.

The application is developed using the **MERN stack** principles: a React (Vite) frontend, an Express/Node.js backend, and MongoDB for user data persistence. User authentication is secured through OTP-based email verification and token-based access control. For recipe intelligence, the backend integrates **Google Generative AI (Gemini)** to generate structured recipe content in JSON and list-based formats for smooth frontend rendering.

This report documents the design, development, methodology, modules, security measures, and outcomes of the GlobalBites system, along with performance observations and future enhancements.

---

### Table of Contents

- Cover Page  
- Certificate of Internship  
- Internship Completion Certificate  
- Acknowledgement  
- Abstract  
- Table of Contents  
- List of Abbreviations  
- List of Figures  
- CHAPTER 1: Introduction  
- CHAPTER 2: Aim and Objectives of the Internship  
- CHAPTER 3: Review of Literature  
- CHAPTER 4: Methodology (Materials and Methods)  
- CHAPTER 5: Observations, Results and Discussion  
- Conclusions and Summary  
- Future Scope  
- References  
- Annexure I: Weekly Log  
- Annexure II: Daily Activity Log  
- Annexure III: Internship Identification Exercise  
- Annexure IV: Student Assessment Review Card  

---

### List of Abbreviations

- AI: Artificial Intelligence  
- API: Application Programming Interface  
- CORS: Cross-Origin Resource Sharing  
- JWT: JSON Web Token  
- MERN: MongoDB, Express, React, Node.js  
- OTP: One-Time Password  
- UI/UX: User Interface / User Experience  

---

### List of Figures (Suggested)

- Figure 1: GlobalBites High-Level System Architecture  
- Figure 2: User Authentication and OTP Verification Flow  
- Figure 3: Ingredient-to-Recipe Generation Workflow  
- Figure 4: AI Chef Feature Flow (Chef Selection to Recipe Output)  
- Figure 5: Budget Recipe Recommendation Workflow  
- Figure 6: Database Schema (User Collection)  

---

## CHAPTER 1: Introduction

### 1.1 Overview of Food-Tech and Recipe Discovery

With increasing urban lifestyles, time constraints, and diverse dietary needs, users frequently seek fast and reliable cooking guidance. Traditional recipe searching often requires multiple attempts due to incomplete information, ingredient mismatch, or unclear steps. Modern food-tech platforms address this gap through recipe databases, personalization, and intelligent recommendations.

### 1.2 Challenges in Everyday Cooking

Common challenges include:

- Not knowing what to cook with available ingredients.
- Managing recipes under a limited budget.
- Aligning meals with mood, health goals, or preferences.
- Lack of step-wise, structured instructions suitable for quick execution.

### 1.3 Introduction to GlobalBites

GlobalBites is a web application that provides **AI-curated recipe suggestions** based on user inputs such as ingredients, dish names, chef personality, and budget constraints. The platform focuses on:

- Fast ingredient-based discovery (multi-recipe list view).
- Detailed single-recipe generation with structured nutrition and steps.
- Chef-styled recipe generation using generative AI prompts.
- Budget-based recommendations with cost breakdown per ingredient.
- Informational features (food-combination awareness, science behind nutrition, and mood-based recommendations).

### 1.4 Purpose of the Project

The purpose of GlobalBites is to design and implement an AI-assisted cooking companion that reduces decision fatigue in meal planning and provides structured recipe content instantly.

### 1.5 Scope of the System

The scope of the project includes:

- User account creation with OTP verification.
- Token-based login and protected profile update.
- AI-powered recipe generation (multi-list and detailed recipe).
- Budget recipe module with price calculations and per-person costs.
- Frontend experiences for features like Chef, Mood, Health, Science, and Food Combo awareness.

### 1.6 Problem Statement

Users struggle to consistently decide meals that match their available ingredients, budget, health constraints, and time. Existing solutions often require browsing many pages or rely only on static recipe databases. There is a need for an interactive system that generates recipes on demand and outputs them in a structured format suitable for modern UI.

### 1.7 Significance of the Project

GlobalBites is significant because it:

- Improves cooking accessibility for beginners by providing structured steps.
- Supports budget-based meal planning with transparent cost estimation.
- Demonstrates practical integration of generative AI into a full-stack web product.
- Encourages mindful eating through informational modules on food combinations and nutrition science.

---

## CHAPTER 2: Aim and Objectives of the Internship

### 2.1 Aim of the Internship

To design, develop, and deploy a full-stack AI-enabled web application (GlobalBites) that supports recipe discovery, personalized culinary experiences, and secure user authentication.

### 2.2 Technical Objectives

- Build responsive UI screens using React (Vite) and Tailwind CSS.
- Implement secure authentication using OTP verification and JWT tokens.
- Integrate MongoDB for storing user account details.
- Develop REST APIs for AI-powered recipe generation modules.
- Integrate Google Generative AI (Gemini) for recipe generation in structured formats.
- Deploy and configure frontend and backend environments for production use.

### 2.3 Professional and Academic Objectives

- Gain experience working with full-stack development workflows.
- Learn API design, error handling, and secure authentication practices.
- Improve debugging and deployment skills across environments.
- Produce formal documentation and report aligned with academic standards.

### 2.4 Expected Outcomes

- A working full-stack application with usable core flows.
- Documented system architecture and implementation details.
- A deployable solution usable for demos and future enhancements.

### 2.5 Work Plan and Timeline (Template)

| Week | Activities |
|------|-----------|
| Week 1 | Requirement analysis, UI wireframe planning, repo setup |
| Week 2 | Authentication (signup/login), OTP verification integration |
| Week 3 | AI recipe endpoints and frontend integration (Home + Selected Recipe) |
| Week 4 | AI Chef and Budget module integration |
| Week 5 | Feature screens (Mood/Health/Science/Combo), UI polishing |
| Week 6 | Testing, bug fixes, deployment, documentation |

---

## CHAPTER 3: Review of Literature

### 3.1 Evolution of Recipe and Food Platforms

Recipe platforms evolved from static blogs and indexed databases to dynamic applications with search filters, ratings, and personalized recommendations. Recent advancements include conversational assistants and AI-generated content that adapts to user constraints.

### 3.2 Study of Existing Platforms

Common capabilities found in popular platforms:

- Ingredient filtering and substitutions.
- Community-driven ratings and reviews.
- Nutrition estimates and serving calculators.
- Meal planning and shopping list generation.

### 3.3 Comparative Analysis (Summary)

Static databases provide reliability but lack personalization and adaptability. AI-powered systems generate content dynamically but require careful validation, structured formatting, and safety constraints. A hybrid approach can combine both in future upgrades.

### 3.4 Frontend Technologies in Modern Web Systems

React-based SPAs are widely adopted due to component reuse, routing support, and integration with API-driven backends. Tooling like Vite improves performance and developer experience.

### 3.5 Backend Technologies

Node.js and Express are commonly used to build scalable REST APIs with middleware-based security, structured routing, and integration support for third-party services such as email and AI providers.

### 3.6 Database Technologies

MongoDB is frequently used for user-centric applications due to flexible schema design and rapid development. Mongoose provides schema validation and modeling support.

### 3.7 Generative AI in Consumer Applications

Generative AI enables on-demand creation of structured outputs such as recipe steps, ingredient lists, and nutrition estimates. For UI consumption, JSON-based outputs are commonly used to maintain predictable rendering and reduce parsing errors.

### 3.8 Security in Web Applications

Key practices include password hashing, token-based authentication, CORS configuration, secure secret management, and validation of user inputs to prevent misuse.

### 3.9 Research Gap and Motivation

While many platforms provide recipes, fewer provide:

- Real-time recipe generation based on exact ingredients.
- Budget estimation with transparent pricing fields.
- Chef-persona based recipe storytelling in structured outputs.

GlobalBites is motivated by this gap to build an interactive, modern, and AI-assisted cooking companion.

---

## CHAPTER 4: Methodology (Materials and Methods)

### 4.1 System Architecture

GlobalBites follows a client-server architecture:

- **Frontend:** React (Vite) SPA using Tailwind CSS and React Router.
- **Backend:** Node.js + Express REST APIs.
- **Database:** MongoDB (User collection).
- **External Services:** Google Generative AI (Gemini) for recipe generation, Brevo for transactional emails (OTP and welcome).

### 4.2 Workflow and Process Flow (High Level)

1. User signs up with email, fullname, and password.
2. Backend generates an OTP and sends it via email.
3. User verifies OTP to activate the account.
4. User logs in to receive a token (JWT) for authenticated actions.
5. User can access AI features:
   - ingredient-based recipe list generation
   - single dish recipe generation
   - chef persona recipe generation
   - budget-based recipe list

### 4.3 Authentication Module

Key steps:

- Passwords are hashed using bcrypt before storage.
- OTP is generated during signup and stored temporarily with user record.
- OTP verification sets the user as verified and triggers a welcome email.
- JWT tokens are issued on signup/login and used for protected routes.

### 4.4 AI Recipe Generation (Ingredients -> List)

The Home module accepts a comma-separated list of ingredients and requests the backend to generate multiple recipe suggestions. The backend:

- Sanitizes and normalizes input ingredients.
- Sends a prompt to the generative AI model.
- Parses the model output into a structured list (name, description, main ingredients, time).
- Returns a maximum of 12 recipes for UI display.

### 4.5 Single Recipe Generation (Dish Name -> JSON)

After selecting a recipe name, the Selected Recipe module requests a detailed recipe JSON. The JSON is designed for UI rendering:

- name, description, time, difficulty, servings, calories
- tags, ingredients, steps
- nutrition per serving, chef tip, mood booster

### 4.6 AI Chef Module

This module provides an entertainment + guidance experience:

- User selects a chef persona from a curated list.
- User enters a dish name.
- Backend requests AI to respond with a strict JSON object including greeting, ingredients, steps, chef message, tags, and signature dishes.

### 4.7 Budget Module

Users specify:

- total budget amount
- meal type (breakfast/lunch/snacks/dinner)
- frequency (daily/weekly/monthly)
- preferences (light/spicy/veg/healthy)

The backend requests AI to generate budget-friendly recipes including ingredient-level pricing, total cost, and cost per person.

Note: The prompt enforces strict JSON and includes validation/cleanup before parsing.

### 4.8 Knowledge and Recommendation Features

GlobalBites includes additional screens to enhance user engagement:

- **Dont Combo:** highlights harmful food combinations with explanations and alternatives.
- **Science Behind:** provides nutrition science and combination facts categorized as Healthy/Neutral/Avoid.
- **Mood Based:** suggests recipes based on mood states and provides a custom mood description flow.
- **Health Goal:** includes BMI calculator, preferences, conditions, and home-remedy tips (educational module).

### 4.9 API Integration

Backend API route groups:

- `/api/auth/*` for authentication
- `/api/recipe-ai/*` for AI recipe features

Frontend calls APIs using Axios and uses environment configuration via `VITE_BACKEND_URL`.

### 4.10 Database Schema Design

The primary collection implemented is `User` with fields:

- email, fullname, password (hashed)
- otp and verification flags
- timestamps

### 4.11 Technologies Used

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, Mongoose, bcrypt, jsonwebtoken, dotenv, cors
- AI: Google Generative AI SDK (Gemini)
- Email: Brevo transactional email API (OTP + welcome)
- Deployment: frontend on Vercel (configured), backend hosted (Railway URL used in env)

### 4.12 Security Implementation

- Password hashing using bcrypt.
- OTP verification for account activation.
- JWT-based authorization for protected actions (example: profile update).
- CORS configured to restrict origins for production frontend.
- Input validation and structured parsing for AI responses to prevent UI crashes.

### 4.13 Testing Strategy

Testing approach includes:

- Manual UI testing of signup/login/OTP flows.
- API testing using sample payloads for recipe endpoints.
- Error handling testing (empty input, timeouts, invalid JSON parsing).

### 4.14 Development Methodology and Sprint Plan

An iterative approach was adopted:

- Build core auth and routing first.
- Integrate AI endpoints for recipe generation.
- Add feature modules and polish UI.
- Fix parsing, caching (localStorage), and error handling.
- Validate deployment configuration and environment variables.

### 4.15 UI/UX Design System (Project Style Guide)

GlobalBites follows a clean, modern, “food-first” UI style implemented using **Tailwind CSS utilities** (default Tailwind color scale + a few custom hex gradients inside feature pages). The UI is designed to feel friendly, trustworthy, and fast to scan, with consistent CTAs, clear feedback states, and responsive layouts.

#### 4.15.1 Visual Goals

- **Approachable & appetizing:** warm greens, soft neutrals, food imagery, rounded surfaces.
- **High clarity:** strong headings, clear card hierarchy, and prominent primary CTA buttons.
- **Consistency:** repeated patterns for buttons, inputs, cards, badges, and section headers.
- **Responsive by default:** mobile-first layouts, a collapsible navbar menu, and flexible grids.

#### 4.15.2 Brand Identity

- **App Name / Logo:** `GlobalBites` wordmark uses a split-color treatment:
  - “Global” → white text on green background.
  - “Bites” → green text on white background.
- **Primary brand feel:** “fresh / healthy / eco” theme driven by green accents and gradients.

#### 4.15.3 Color System

The project uses Tailwind’s semantic colors plus a few custom hex colors used for gradients and highlights across feature pages.

**A) Core semantic palette (Tailwind classes)**

- **Primary (success/brand):** `bg-green-600`, `hover:bg-green-700`, `text-green-600`, `focus:ring-green-200`
- **Secondary accents:** `teal-*`, `indigo-*`, `blue-*`, `emerald-*`, `purple-*`, `pink-*`
- **Neutrals:** `bg-white`, `bg-gray-50/100`, `text-gray-700/800`, `border-gray-200`
- **Feedback states:**
  - Success: `text-green-600`, `bg-green-50`
  - Warning: `text-yellow-700`, `bg-yellow-50/100`
  - Error: `text-red-600`, `bg-red-50`, `border-red-200`
  - Info: `text-blue-600/700`, `bg-blue-50/100`

**B) Custom hex colors observed in UI**

- **Greens (brand/gradient):** `#16a34a`, `#15885e`, `#009d3c`, `#0a9b00`, `#076400`, `#15bb7d`, `#10B981`, `#38A169`
- **Warm highlights:** `#FFD3B6`, `#FFAAA5`, `#ffb889`, `#FFF3E2`, `#FFEFCB`
- **Deep contrast tones:** `#1E293B`, `#64748B`, `#3B2F2F`, `#6A0572`
- **Soft surfaces/backgrounds:** `#FAFAFA`, `#f5f5f5`, `#EDF6E5`, `#bbfae3`, `#E6F4EA`, `#F0FFF4`
- **Error reds:** `#FF6B6B`, `#FF5252`, `#C53030`

**Color usage rules (project convention)**

- Use **green** for primary navigation + primary actions (Login, Home, main CTAs).
- Use **gray** for text hierarchy and borders; avoid pure black for long text blocks.
- Use **indigo/blue** for OTP/verification and informational UI.
- Use **red** only for destructive/error states and the “heart” favourite accent.

#### 4.15.4 Typography

- **Font family:** default system sans stack (Tailwind default). OTP inputs use `font-mono` for readability.
- **Font weights:** `font-medium` for CTAs, `font-semibold` for labels, `font-bold` for headings and hero titles.
- **Common type scale (as used in screens):**
  - Titles/Hero: `text-4xl` to `text-5xl`, `font-bold`
  - Page headings: `text-2xl`, `font-bold`
  - Section headings: `text-lg` to `text-xl`, `font-semibold/bold`
  - Body: `text-sm` to `text-base`, `text-gray-600/700`
  - Helper text: `text-xs` to `text-sm`, `text-gray-500/600`

#### 4.15.5 Layout, Spacing, and Grid

- **Top navigation:** fixed presence at the top with shadow + border to separate content (`shadow-lg`, `border-b`).
- **Containers:** large screens use centered width constraints (example pattern: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Spacing:** consistent padding and gaps (`p-4/p-6/p-8`, `gap-2/gap-4/gap-6`) to preserve readability.
- **Cards & surfaces:** rounded corners + subtle borders + shadows:
  - Rounded: `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`
  - Shadows: `shadow-sm`, `shadow-lg`, `shadow-2xl`
  - Frosted surfaces: `bg-white/95`, `backdrop-blur-md`
- **Responsive behavior:** `md:hidden` / `hidden md:block` for navbar; grids switch columns based on screen size.

#### 4.15.6 Component Patterns (What the UI consistently uses)

**A) Navbar**

- White background, subtle border, shadow for elevation.
- Primary navigation items are green buttons (`bg-green-600` + hover), with icons (`lucide-react`) and short labels.
- Mobile menu slides into a vertical list with softer styles (gray text + green hover).

**B) Primary button**

- Base: `px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700`
- Interaction: `transition-colors duration-200`, `shadow-sm hover:shadow-md`
- Shape: small radius (`rounded-sm`) or larger radius on hero CTAs (`rounded-xl`)

**C) Inputs**

- Clear label + leading icon in a left-aligned input slot.
- 2px neutral border with stronger border and ring on focus:
  - `border-2 border-gray-200`
  - `focus:border-green-500 focus:ring-2 focus:ring-green-200`
- Minimum touch target height: `min-h-[50px]` on auth screens.

**D) Cards (Recipe and feature cards)**

- Elevated surface, strong title, 2–3 line clamp on description, and a bottom CTA button.
- Uses gradients and a “glassmorphism” style in some feature pages for modern feel.

**E) Feedback/alerts**

- Inline messages inside a soft container (`bg-gray-50`, `border-gray-200`) with status-colored text (green/red/yellow).

**F) Loading state**

- Centered “Cooking…” label with subtle animated dots; minimal distraction while AI response is in progress.

#### 4.15.7 Motion & Micro-interactions

- Hover elevation: `hover:shadow-md` / `hover:shadow-xl`
- Scale/press feedback on important CTAs: `transform hover:scale-[1.02] active:scale-95`
- Smooth transitions: `transition-all duration-300` (used widely)
- Custom animations:
  - Tailwind config extends a `spinOnce` animation
  - Feature pages include `fadeIn`, `fadeInUp`, and slide-like transitions for content reveal

#### 4.15.8 Accessibility & Usability Considerations

- **Focus visibility:** focus rings on inputs and buttons (especially on auth flows).
- **Readable contrast:** dark gray text (`text-gray-700/800`) on light surfaces; avoid low-contrast text on gradients.
- **Icon + text pairing:** icons are accompanied by labels to reduce ambiguity.
- **Mobile touch targets:** larger input height and padded buttons for comfortable tap interaction.

#### 4.15.9 Suggested UI Enhancements (Future UI/UX Scope)

- Convert repeated hex gradients into **Tailwind theme tokens** (extend `colors`) for long-term consistency.
- Standardize a single **Button API** (support `disabled`, `className`, `variant`, `size`) to avoid ad-hoc inline styles.
- Centralize global custom CSS (animations/scrollbar) into a single stylesheet to reduce per-page `<style>` blocks.
- Add basic **ARIA labels** where icon-only buttons exist (e.g., show/hide password, close modal).
- Consider **dark mode** (Tailwind `dark:`) for better usability in low light.

---

## CHAPTER 5: Observations, Results and Discussion

### 5.1 Platform Home Dashboard

The Home screen provides:

- ingredient search input
- AI-curated recipe cards
- navigation to feature modules

Observation: Constraining output to a structured format improves rendering reliability and reduces UI parsing complexity.

### 5.2 Authentication Results

Results:

- OTP verification improves account authenticity and reduces fake signups.
- JWT token allows protected APIs without frequent re-login.

Discussion: Token storage method and secure cookie usage must be carefully planned for production security and cross-site constraints.

### 5.3 Recipe Generation Results

Results:

- Ingredient-based generation produces multiple options quickly.
- Single recipe JSON output supports detailed presentation (steps, nutrition, tags).

Discussion: AI outputs require defensive parsing and validation to avoid unexpected formatting issues.

### 5.4 AI Chef Results

Results:

- Chef persona output improves engagement and can provide chef-specific tone and tips.
- JSON-only responses make frontend rendering predictable.

### 5.5 Budget Module Results

Results:

- Recipes include ingredient-level price estimation and total cost calculation.
- Per-person cost helps users make better decisions.

Discussion: Pricing is approximate and depends on region; future versions can connect to real price sources.

### 5.6 Mood/Health/Science Modules

Results:

- These modules increase value through educational and lifestyle guidance.
- BMI tool and health condition selection help personalization direction.

### 5.7 Performance Evaluation (Qualitative)

- API latency depends on AI generation time and network conditions.
- Caching via localStorage reduces repeated calls for the same recipe.

### 5.8 Usability Testing (Qualitative)

- Clear CTAs and consistent UI components improve learnability.
- Feature screens provide guided input choices, lowering user confusion.

### 5.9 Security Testing (Basic)

- Verified behavior for invalid token / missing token on protected route.
- Validated OTP error handling for wrong codes.

---

## Conclusions and Summary

GlobalBites demonstrates how generative AI can be practically integrated into a modern full-stack web application to improve recipe discovery, meal planning, and culinary engagement. The implemented authentication flow ensures a basic level of user trust through OTP verification. AI modules provide multiple entry points for users: ingredient-based discovery, detailed recipe generation, chef persona experiences, and budget-friendly suggestions. The project also highlights the importance of structured AI outputs and defensive parsing for stable UI rendering.

---

## Future Scope

- Add persistent recipe storage: My Recipes and Favourites backed by database APIs (CRUD).
- Add real nutrition sources and better calorie estimates (validated datasets).
- Improve security: move tokens to secure cookies end-to-end, refresh token strategy, and stronger input validation.
- Add user personalization (dietary profile, allergies, cuisine preferences).
- Add real-time cooking mode: timers, step checklist, shopping list export.
- Add admin analytics and monitoring for AI failures/timeouts.

---

## References (Template)

1. React Documentation  
2. Vite Documentation  
3. Express.js Documentation  
4. MongoDB and Mongoose Documentation  
5. JSON Web Token (JWT) Documentation  
6. bcrypt Documentation  
7. Google Generative AI SDK Documentation  
8. Brevo (Sendinblue) Transactional Email API Documentation  

---

## Annexure I: Weekly Log (Template)

| Week | Date Range | Work Done | Outcome |
|------|------------|----------|---------|
| 1 | <dates> | Requirements + setup | Repo and base UI ready |
| 2 | <dates> | Auth + OTP | Signup/login/verify working |
| 3 | <dates> | AI recipe list + details | Recipe generation integrated |
| 4 | <dates> | Chef + Budget | Feature modules integrated |
| 5 | <dates> | UI polish + knowledge modules | Screens completed |
| 6 | <dates> | Testing + documentation | Final report prepared |

---

## Annexure II: Daily Activity Log (Template)

| Date | Task | Hours | Remarks |
|------|------|-------|---------|
| <date> | <task> | <hrs> | <remarks> |

---

## Annexure III: Internship Identification Exercise (Template)

- Organization profile: <Company Name, domain, products/services>  
- Internship role: Full-Stack Developer / Frontend / Backend (choose one)  
- Tools used: React, Node, MongoDB, AI API, Email API  
- Learning outcomes: API integration, auth, deployments, debugging, UI/UX  

---

## Annexure IV: Student Assessment Review Card (Template)

- Attendance and punctuality: ____ / 10  
- Technical skills: ____ / 10  
- Communication skills: ____ / 10  
- Teamwork: ____ / 10  
- Task completion: ____ / 10  
- Overall performance: ____ / 10  

**Industry Mentor Remarks:** ____________________________________________  
**Mentor Signature:** ____________________  **Date:** ____________________  
