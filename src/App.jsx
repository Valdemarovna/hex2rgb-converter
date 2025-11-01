import { useState } from 'react'
import './App.css'

function App() {
  const [hexColor, setHexColor] = useState('')
  const [rgbColor, setRgbColor] = useState('rgb(0, 0, 0)')
  const [backgroundColor, setBackgroundColor] = useState('#000000')
  const [isError, setIsError] = useState(false)

  const handleHexChange = (e) => {
    const value = e.target.value
    setHexColor(value)

    // Если поле пустое
    if (value === '') {
      setRgbColor('rgb(0, 0, 0)')
      setBackgroundColor('#000000')
      setIsError(false)
      return
    }

    // Если введен #, но нет других символов
    if (value === '#') {
      setRgbColor('rgb(0, 0, 0)')
      setBackgroundColor('#000000')
      setIsError(false)
      return
    }

    // Проверяем валидность HEX цвета
    if (isValidHex(value)) {
      const rgb = hexToRgb(value)
      if (rgb) {
        setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
        setBackgroundColor(value)
        setIsError(false)
      } else {
        setRgbColor('Ошибка!')
        setBackgroundColor('#ff0000')
        setIsError(true)
      }
    } else {
      setRgbColor('Ошибка!')
      setBackgroundColor('#ff0000')
      setIsError(true)
    }
  }

  const isValidHex = (hex) => {
    // Проверяем форматы: #rgb, #rgba, #rrggbb, #rrggbbaa
    return /^#?([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex)
  }

  const hexToRgb = (hex) => {
    // Убираем # из начала
    let cleanHex = hex.replace('#', '')
    
    // Если короткий формат (3 символа), расширяем его
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('')
    }
    
    // Если 4 символа (RGBA), берем только RGB
    if (cleanHex.length === 4) {
      cleanHex = cleanHex.substring(0, 3).split('').map(char => char + char).join('')
    }
    
    // Если 8 символов (RRGGBBAA), берем только RRGGBB
    if (cleanHex.length === 8) {
      cleanHex = cleanHex.substring(0, 6)
    }

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
            className={`hex-input ${isError ? 'error' : ''}`}
            value={hexColor}
            onChange={handleHexChange}
            placeholder="Введите HEX"
          />
        </div>
        <div className="result-section">
          <div className={`rgb-output ${isError ? 'error' : ''}`}>
            {rgbColor}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App