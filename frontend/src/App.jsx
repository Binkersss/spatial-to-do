import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import SpacesPage from './pages/SpacesPage';

import Navbar from './components/NavBar';

const spaces = [
  {
    tasks: [
      { id: 1, name: 'Task 1', position: { x: 10, y: 20 } },
      { id: 2, name: 'Task 2', position: { x: 200, y: 200 } },
    ],
  },
];

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spaces" element={<SpacesPage spaces={spaces} />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
