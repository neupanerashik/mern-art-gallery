import {React} from 'react'

import './bubbles.css'

const Bubbles = ({style}) => {
    return (
        <div style={style} className="bubbleContainer">
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default Bubbles