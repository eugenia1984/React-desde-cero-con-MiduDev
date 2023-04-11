import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'

function App() {
  const { fromLanguage, setFromLanguage } = useStore()

  return (
    <div className="App">
      <h1>Google translate</h1>
      <button onClick={ () => {
        setFromLanguage('es')
      } }>Change to Spanish</button>{ fromLanguage }
    </div>
  )
}

export default App
