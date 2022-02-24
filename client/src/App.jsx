import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import Home from './pages/Home'
import './css/index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/docs/${v4()}`} />} />
        <Route path="/docs/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
