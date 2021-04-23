import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import face from './face.png';

const Logo = () => {
   return (
      <div className= 'ma4 mt0'>
         <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }}>
            <div className="Tilt-inner"> <img className="img" style = {{paddingTop: '25px'}} src ={face} alt= 'logo'/> </div>
         </Tilt>
      </div>
   );

}

export default Logo;