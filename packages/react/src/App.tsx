import './App.css'
import BaMaoCodeMirror from '@/components/CodeMirror'

function App() {
  return (
    <>
      <BaMaoCodeMirror
        value={`function a () { \n console.log('123')\n }`}
        options={{ height: '600px' }}
      />
    </>
  )
}

export default App
