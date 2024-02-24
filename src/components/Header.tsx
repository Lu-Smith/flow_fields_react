import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  mode: string; 
  toggleMode: (modeName: string) => void; 
}

const Header: React.FC<HeaderProps> = ({mode, toggleMode}) => {
  return (
    <div className={`Header ${mode}`}>
      <div>
        <h2> Choose your mode</h2>
        <span className="material-symbols-outlined">
          arrow_forward
        </span>
      </div>
      <span className="material-symbols-outlined light" onClick={() => toggleMode('light')}>
        wb_sunny
      </span>
      <span className="material-symbols-outlined dark" onClick={() => toggleMode('dark')}>
        nightlight
      </span>
      <span className="material-symbols-outlined bolt" onClick={() => toggleMode('bolt')}>
        bolt
      </span>
    </div>
  )
}

export default Header