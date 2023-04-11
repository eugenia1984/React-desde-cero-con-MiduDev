import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const initialState = {
  fromLanguajge: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function App() {

  return (
    <div className="App">
      <h1>Google translate</h1>
    </div>
  )
}

export default App
