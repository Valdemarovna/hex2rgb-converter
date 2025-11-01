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

    // Если введен только #
    if (value === '#') {
      setRgbColor('Введите полный HEX...')
      setBackgroundColor('#000000')
      setIsError(false)
      return
    }

    // Если меньше 7 символов - показываем промежуточный результат
    if (value.length < 7) {
      setRgbColor('Введите полный HEX...')
      setBackgroundColor('#000000')
      setIsError(false)
      return
    }

    // Если ровно 7 символов - проверяем валидность
    if (value.length === 7) {
      // Проверяем начинается ли с # и содержит 6 hex-символов
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        const rgb = hexToRgb(value)
        if (rgb) {
          setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
          setBackgroundColor(value)
          setIsError(false)
        } else {
          showError()
        }
      } else {
        showError()
      }
    }
  }

  const showError = () => {
    setRgbColor('Ошибка!')
    setBackgroundColor('#ff0000')
    setIsError(true)
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
            className={`hex-input ${isError ? 'error' : ''}`}
            value={hexColor}
            onChange={handleHexChange}
            maxLength={7}
            placeholder="#000000"
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