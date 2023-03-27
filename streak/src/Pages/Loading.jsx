import React from 'react';
import "../style/Loading.css";
let fire = require('../images/fire.png');



const LoadingAnimation = () => {
    return (
        <>
            <div id='fire_border'>
                <img id="fire" src={fire} />
            </div>

        </>
    )
}

export default LoadingAnimation;