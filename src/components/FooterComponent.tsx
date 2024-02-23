import React from 'react';
import '../styles/Footer.css';

interface FooterProps {
  mode: string;  
}

const FooterComponent: React.FC<FooterProps> = ({mode}) => {
  return (
    <div className={`Footer ${mode}`}>
        <h3>Coded by 
            <a
             href='https://www.lunasmithart.com/' 
             target='_blank'
             className='portfolio'>
                Luna Smith
            </a>
            -
            <a 
            href='https://github.com/Lu-Smith/flow_fields_react'
            target='_blank'>
                GitHub
            </a>
            .
        </h3>
    </div>
  )
}

export default FooterComponent