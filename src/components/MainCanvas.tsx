import React from 'react';

interface MainProps {
  mode: string; 
}

const MainCanvas: React.FC<MainProps> = ({mode}) => {
  return (
    <div className={`MainCanvas ${mode}`}>
      MainCanvas
    </div>
  )
}

export default MainCanvas