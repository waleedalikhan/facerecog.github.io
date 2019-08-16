import React from "react";
import Tilt from 'react-tilt';
import brain from './brain.png';
import './style.css';

const Logo = () => {
    return (
        < div className="m-4 mt-0">
            <Tilt className="Tilt shadow-lg" options={{ max: 55 }} style={{ height: 160, width: 160 }} >
                <div className="Tilt-inner p-3">
                    <img src={brain} alt='brain' style={{paddingTop: '5px'}}/>
                </div>
            </Tilt>
        </div >
    )
}

export default Logo;