import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Scorecard from './pages/Scorecard';
import Schedule from './pages/Schedule';
import PointsTable from './pages/PointsTable';
import Updates from './pages/Updates';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="scorecard" element={<Scorecard />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="points-table" element={<PointsTable />} />
            <Route path="updates" element={<Updates />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
