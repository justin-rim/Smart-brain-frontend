import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
   return (
      <div>
         <p className = 'f3'>
            {'This Magic Brain will detect faces in your pictures.'}
         </p>
         <p className = 'f3'>
            {'Paste an image URL into the box below!'}
         </p>
         <div className = 'center'>
            <div className= 'form center pa4 br3 shadow-5'>
               <input className = 'f5 pa2 w-80 center bg-white' type= 'text' onChange={onInputChange}/>
               <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple'   onClick= {onPictureSubmit}>Detect</button>  
            </div>
         </div>
      </div>
   );
}

export default ImageLinkForm;