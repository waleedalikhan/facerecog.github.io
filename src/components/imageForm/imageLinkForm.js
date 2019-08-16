import React from 'react';
import './imageForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className="lead">
                This Magic Brain will detect faces in your pictures. Give it a try.
            </p>
            <div className="center">
                <div className='p-4 shadow-lg theContainer'>
                    <input className="p-2 input-form" type='text' onChange={onInputChange}/>
                    <button className="py-2 px-3 input-button" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
};


export default ImageLinkForm;