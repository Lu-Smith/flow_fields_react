import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  mode: string; 
  toggleMode: () => void; 
}

const Header: React.FC<HeaderProps> = ({mode, toggleMode}) => {
  return (
    <div className={`Header ${mode}`}>
      <div>
        <h2> Choose your mode</h2>
        <span className="material-symbols-outlined" onClick={toggleMode}>
          arrow_forward
        </span>
      </div>
      <span className="material-symbols-outlined" onClick={toggleMode}>
        wb_sunny
      </span>
      <span className="material-symbols-outlined" onClick={toggleMode}>
        nightlight
      </span>
      <span className="material-symbols-outlined" onClick={toggleMode}>
        bolt
      </span>
    </div>
  )
}

export default Header