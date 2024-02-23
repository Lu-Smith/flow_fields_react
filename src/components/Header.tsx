import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className='Header'>
      <div>
        <h2> Choose your mode</h2>
        <span className="material-symbols-outlined">
          arrow_forward
        </span>
      </div>
      <span className="material-symbols-outlined">
        wb_sunny
      </span>
      <span className="material-symbols-outlined">
        nightlight
      </span>
      <span className="material-symbols-outlined">
        bolt
      </span>
    </div>
  )
}

export default Header