import './styles/App.css'
import FooterComponent from './components/FooterComponent'
import Header from './components/Header'
import MainCanvas from './components/MainCanvas'

function App() {  return (
    <div className='App'>
        <div className='HeaderContainer'>
          <Header />
        </div>
        <div className='CanvasContainer'>
          <MainCanvas />
        </div>
        <div className='FooterContainer'>
          <FooterComponent />
        </div>
    </div>
  )
}

export default App
