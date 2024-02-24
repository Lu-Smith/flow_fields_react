import './styles/App.css';
import React, { useState } from 'react';
import FooterComponent from './components/FooterComponent';
import Header from './components/Header';
import MainCanvas from './components/MainCanvas';
import CanvasOne from './components/CanvasOne';
import CanvasTwo from './components/CanvasTwo';
import CanvasThree from './components/CanvasThree';

const App = () => {  
  const [mode, setMode] = useState('light');

  const toggleMode = (modeName: string) => {
    setMode(modeName);
    console.log(modeName)
  };

  return (
    <div className={`App ${mode}`}>
        <div className={`HeaderContainer ${mode}`}>
          <Header mode={mode} toggleMode={toggleMode} />
        </div>
        <div className={`CanvasContainer ${mode}`}>
          <MainCanvas mode={mode} />
          <CanvasThree mode={mode}/>
          <CanvasOne mode={mode}/>
          <CanvasTwo mode={mode}/>
        </div>
        <div className={`FooterContainer ${mode}`}>
          <FooterComponent mode={mode} />
        </div>
    </div>
  )
}

export default App
