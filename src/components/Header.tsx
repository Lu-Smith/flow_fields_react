import React from 'react';
import '../styles/Header.css';
import { motion} from 'framer-motion';

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
      <motion.div  whileHover={{ scale: 1.3 }} whileTap={{ scale: 1.1 }}>
        <span className="material-symbols-outlined light" onClick={() => toggleMode('light')}>
          wb_sunny
        </span>
      </motion.div>
      <motion.div  whileHover={{ scale: 1.3 }} whileTap={{ scale: 1.1 }}>
        <span className="material-symbols-outlined dark" onClick={() => toggleMode('dark')}>
          nightlight
        </span>
      </motion.div>
      <motion.div  whileHover={{ scale: 1.3 }} whileTap={{ scale: 1.1 }}>
        <span className="material-symbols-outlined bolt" onClick={() => toggleMode('bolt')}>
          bolt
        </span>
      </motion.div>
    </div>
  )
}

export default Header