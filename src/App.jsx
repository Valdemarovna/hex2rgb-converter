import { useState } from 'react'
import './App.css'

function App() {
  const [hexColor, setHexColor] = useState('#')
  const [rgbColor, setRgbColor] = useState('rgb(0, 0, 0)')
  const [backgroundColor, setBackgroundColor] = useState('#000000')

  const handleHexChange = (e) => {
    const value = e.target.value
    setHexColor(value)

    // Проверяем валидность HEX цвета
    if (value.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(value)) {
      const rgb = hexToRgb(value)
      if (rgb) {
        setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
        setBackgroundColor(value)
      } else {
        setRgbColor('Ошибка!')
        setBackgroundColor('#ff0000') // Красный фон при ошибке
      }
    } else if (value.length > 7) {
      setRgbColor('Ошибка!')
      setBackgroundColor('#ff0000')
    } else {
      setRgbColor('rgb(0, 0, 0)')
      setBackgroundColor('#000000')
    }
  }

  const hexToRgb = (hex) => {
    // Убираем # из начала
    const cleanHex = hex.replace('#', '')

    // Преобразуем HEX в RGB
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)

    // Проверяем на валидность
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return null
    }

    return { r, g, b }
  }

  return (
    <div 
      className="app" 
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="converter-container">
        <div className="input-section">
          <input
            type="text"
            className="hex-input"
            value={hexColor}
            onChange={handleHexChange}
            maxLength={7}
            placeholder="#000000"
          />
        </div>
        <div className="result-section">
          <div className="rgb-output">
            {rgbColor}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App