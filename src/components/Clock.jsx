import React, { useState, useEffect } from 'react';

export default function Clock() {

    const [counter, setCounter] = useState(0);
    const [speed, setSpeed] = useState(10);
    const [active, setActive] = useState(true);
    const [color, setColor] = useState('');

    useEffect(() => {
        let interval = null;
        if(active) {
            interval = setInterval(() => {
                if(counter < 360) {
                    setCounter(counter+1);      
                } else {
                    setCounter(0);
                }
                if(counter % 90 === 0) {
                    setColor(getRandomColor());
                }
            },speed);
        } else {
            clearInterval(interval);
        }       
        return () => {
            clearInterval(interval);
        };
    }, [counter,active]);

    let getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
               
    return(
        <section>
            <div className="container" style={{backgroundColor: color}}>
                <div className="bar" style={{transform: 'rotate('+counter+'deg)'}}>
                    <p>{counter}</p>
                    <div></div>
                </div>                
            </div>
            <div className="flex-center">
                <button onClick={() => setActive(!active)}>{active ? 'Pause' : 'Play'}</button>
                <button onClick={() => {setCounter(0); setActive(false)}}>Reset</button>
                <button onClick={() => {setSpeed((currentSpeed) => currentSpeed + 1)}}>Slow</button>
                <button onClick={() => {setSpeed((currentSpeed) => currentSpeed > 0 ? currentSpeed - 1 : 0)}}>Speed</button>
            </div>            
        </section>
    )
}