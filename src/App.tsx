import './styles/App.css';
import React, { useState } from 'react';
import FooterComponent from './components/FooterComponent';
import Header from './components/Header';
import MainCanvas from './components/MainCanvas';

const App = () => {  
  const [mode, setMode] = useState('light');

  const toggleMode = (modeName: string) => {
    setMode(modeName);
    console.log(modeName)
  };

  return (
    <div className='App'>
        <div className='HeaderContainer'>
          <Header mode={mode} toggleMode={toggleMode} />
        </div>
        <div className='CanvasContainer'>
          <MainCanvas mode={mode} />
        </div>
        <div className='FooterContainer'>
          <FooterComponent mode={mode} />
        </div>
    </div>
  )
}

export default App
