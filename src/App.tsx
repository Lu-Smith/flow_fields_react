import './styles/App.css';
import { useState } from 'react';
import FooterComponent from './components/FooterComponent';
import Header from './components/Header';
import MainCanvas from './components/MainCanvas';
import CanvasOne from './components/CanvasOne';
import CanvasTwo from './components/CanvasTwo';
import CanvasThree from './components/CanvasThree';
import { motion} from 'framer-motion';
import CanvasFour from './components/CanvasFour';

const childVariantsR = {
  hidden: { x: -500, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 1 } },
};

const childVariantsL = {
  hidden: { x: 500, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 1 } },
};

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
        <motion.div 
        className={`CanvasContainer ${mode}`}>
          <motion.div variants={childVariantsR}  initial="hidden" whileInView={"visible"}>
            <MainCanvas mode={mode} />
          </motion.div>
          <motion.div variants={childVariantsL} initial="hidden" whileInView={"visible"}>
            <CanvasThree mode={mode} />
          </motion.div>
          <motion.div variants={childVariantsR} initial="hidden" whileInView={"visible"}>
            <CanvasOne mode={mode} />
          </motion.div>
          <motion.div variants={childVariantsL} initial="hidden" whileInView={"visible"}>
            <CanvasTwo mode={mode} />
          </motion.div>
          <motion.div variants={childVariantsL} initial="hidden" whileInView={"visible"}>
            <CanvasFour mode={mode} />
          </motion.div>
        </motion.div>
        <div className={`FooterContainer ${mode}`}>
          <FooterComponent mode={mode} />
        </div>
    </div>
  )
}

export default App
