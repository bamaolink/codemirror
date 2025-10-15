import './App.css'
import BaMaoCodeMirror from '@/components/CodeMirror'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState(
    `function a () { \n console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')console.log('123')\n}`
  )
  const [options, setOptions] = useState({
    height: '600px',
    lineWrapping: false,
  })
  setTimeout(() => {
    setValue(
      `function a () { \n console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')console.log('456')\n}`
    )
    setOptions({
      height: '300px',
      lineWrapping: true,
    })
  }, 6000)
  return (
    <div className="p-4">
      <BaMaoCodeMirror value={value} options={options} />
    </div>
  )
}

export default App
