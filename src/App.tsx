import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('#667eea')
  
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
  ]

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    document.body.style.background = `linear-gradient(135deg, ${newColor} 0%, ${colors[(colors.indexOf(newColor) + 1) % colors.length]} 100%)`
  }

  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">
          🦎
        </div>
        <h1>Chameleon</h1>
        <p>A beautiful React app that adapts to your style</p>
        
        <div className="color-palette">
          <h3>Choose your color</h3>
          <div className="colors">
            {colors.map((c) => (
              <button
                key={c}
                className={`color-button ${color === c ? 'active' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => handleColorChange(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h4>Fast</h4>
            <p>Built with Vite for lightning-fast development</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎨</div>
            <h4>Beautiful</h4>
            <p>Modern design with smooth animations</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <h4>Responsive</h4>
            <p>Looks great on all devices</p>
          </div>
        </div>

        <div className="deploy-info">
          <p>Ready to deploy on</p>
          <div className="vercel-logo">▲ Vercel</div>
        </div>
      </div>
    </div>
  )
}

export default App