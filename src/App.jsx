import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
