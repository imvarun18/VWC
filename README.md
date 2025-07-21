# RC24 Virtual Willow Championship

A comprehensive cricket tournament tracking web application built with React, TypeScript, and Tailwind CSS. Experience the ultimate cricket tournament with live scoring, comprehensive statistics, and real-time updates.

## 🏏 Features

### Core Features
- **Live Scorecard** - Real-time match scoring with ball-by-ball updates
- **Match Schedule** - Daily refreshing schedule with filtering options
- **Points Table** - Current tournament standings with NRR calculations
- **Tournament Updates** - Latest news, announcements, and match results
- **Multi-page Navigation** - Seamless routing between different sections

### Design & User Experience
- **Responsive Design** - Compatible with all device sizes (mobile, tablet, desktop)
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Green Cricket Theme** - Beautiful green and greenish-blue gradient color scheme
- **Modern UI Components** - Clean, professional interface with smooth animations
- **Accessibility** - Screen reader friendly and keyboard navigation support

## 🚀 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for lightning-fast development
- **Styling**: Tailwind CSS with custom cricket-themed components
- **Routing**: React Router for single-page application navigation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for robust date manipulation
- **State Management**: React Context for theme management

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Add your assets** (Required for full branding)
   - Place your `tourni_logo.mp4` file in the `public` folder
   - Place team logo images in `public/team-logos/` folder
   - See `ASSETS_SETUP_GUIDE.md` for detailed instructions

4. **Open your browser**
   Navigate to `http://localhost:5173`

**Note**: The app will work without assets but will show fallback designs (SVG logo and team initials instead of actual logos).

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile Devices** (320px and up)
- **Tablets** (768px and up)  
- **Desktop** (1024px and up)
- **Large Screens** (1280px and up)

## 🎨 Theme System

### Light Mode
- Clean white backgrounds with subtle gray accents
- High contrast text for readability

### Dark Mode  
- Rich dark backgrounds with muted colors
- Comfortable viewing with excellent contrast

### Color Palette
- **Primary Green**: #22c55e (cricket field inspired)
- **Secondary Teal**: #14b8a6 (cricket boundary inspired)
- **Custom Gradients**: Cricket-themed gradients throughout

## 🏗️ Application Structure

```
src/
├── components/          # Reusable UI components
│   └── layout/         # Layout components (Header, Footer, Layout)
├── contexts/           # React contexts (Theme)
├── data/              # Mock data and API interfaces
├── pages/             # Main application pages
├── types/             # TypeScript type definitions
└── index.css         # Global styles and Tailwind imports
```

**Made with ❤️ for cricket enthusiasts**
```
