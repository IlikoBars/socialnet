# socialnet

A modern social platform for local communities featuring an interactive district map, live content feed, and unique Meo Fusciuni-inspired design.

![City - Main Page](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-0055FF)

## ✨ Features

### 🗺️ Interactive District Map
- Clickable city districts with local content
- Real Vladikavkaz data from 2GIS/OpenStreetMap
- Animated transitions between districts
- Statistics for each district (posts, likes, photos)

### 📱 Live Content Feed
- Infinite scroll with optimized loading
- Support for photos, videos, audio, and text posts
- Like-based system and daily best content selection
- Limit: one post per day per author

### 🎨 Unique Design
- Inspired by Meo Fusciuni style with elegant filters
- Asymmetric composition and living animations
- Mix of rounded and square forms
- Custom color palette (soul, shadow, memory, whisper)

### 🏛️ Cultural Section
- Special section for local holidays and traditions
- Integration with local events
- Cultural heritage preservation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/IlikoBars/gorod-social-network.git
cd gorod-social-network
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend (optional)
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
```

4. **Run the project**
```bash
# Frontend
cd frontend
npm run dev

# Backend (in separate terminal)
cd backend
uvicorn app:app --reload
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

### Frontend (Next.js 15 + TypeScript)
```
frontend/
├── app/                    # App Router pages
├── components/             # Atomic Design components
│   ├── atoms/             # Basic components
│   ├── molecules/         # Composite components
│   └── organisms/         # Complex blocks
├── hooks/                 # Custom React hooks
├── utils/                 # Utilities and helpers
├── data/                  # Mock data and types
└── styles/                # Global styles
```

### Backend (FastAPI + SQLAlchemy)
```
backend/
├── app.py                 # Main application
├── models.py              # SQLAlchemy models
├── database.py            # Database settings
├── routes/                # API routes
│   ├── auth.py           # Authentication
│   └── posts.py          # Posts and content
└── schemas/               # Pydantic schemas
```

## 🎯 Key Technologies

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Typed JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Atomic Design** - Component design methodology

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **Pydantic** - Data validation
- **JWT** - Authentication

### Tools
- **2GIS API** - Vladikavkaz places data
- **OpenStreetMap** - Geographic data
- **Canvas API** - Browser image processing

## 🎨 Design System

### Color Palette
```css
--soul: #F8F7F4;      /* Pure white with warm tint */
--shadow: #1A1A1A;    /* Deep black */
--memory: #D4C4A8;    /* Warm beige */
--whisper: #E8E0D0;   /* Light beige */
--gold: #B38B59;      /* Warm golden */
--amber: #C4A484;     /* Soft brown */
--earth: #9CAF88;     /* Muted green */
```

### Typography
- **Playfair Display** - Headings (font-soul)
- **Inter** - Body text (font-memory)
- **JetBrains Mono** - Code and digits (font-whisper)

### Animations
- Smooth transitions with `easeOut` curves
- Micro-animations for interactive elements
- Complex trajectories with Framer Motion keyframes
- Optimized performance

## 📊 Performance

### Optimizations
- ✅ Lazy loading components
- ✅ Image optimization with Next.js Image
- ✅ Memoization with React.memo and useMemo
- ✅ Virtualization for long lists
- ✅ Code splitting by routes

### Metrics
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

We welcome contributions to the project! 

### How to contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code standards
- TypeScript for typing
- ESLint + Prettier for formatting
- Conventional Commits for commit messages
- Tests for critical functionality

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Meo Fusciuni** - for design inspiration
- **2GIS** - for places API data
- **OpenStreetMap** - for open geographic data
- **Vladikavkaz Community** - for support and ideas

## 📞 Contact

- **Author**: Alborov Ilia
- **GitHub**: [@IlikoBars](https://github.com/IlikoBars)

---

⭐ If you like the project, give it a star on GitHub! 
