import * as Tone from 'tone'
import React, {useState, useEffect} from 'react'
import {LinearProgress, Box} from '@mui/material'
import soundwaves from "../images/transparentSoundwaves.png";

const AudioMeter = () => {
    const [level, setLevel] = useState(0)
    const [intervalId, setIntervalId] = useState(null)
    const meter = new Tone.Meter({normalRange: true})
    const mic = new Tone.UserMedia().connect(meter)

    useEffect(()=>{
        mic.open().then(() => {
        console.log("mic open")
        setIntervalId(setInterval(() => setLevel(meter.getValue()), 25))
    }).catch(e => {
        console.log("mic not open")
    })
        return ()=>{
            clearInterval(intervalId)
        }
    }, [])
    
    return (
        <div style={{display: "inline"}}>
            <LinearProgress sx={{ height: "50px", transform: "rotate(270deg) translate(320px, 225px)" }} variant="determinate" value={Math.pow(level, 0.2) * 120}/>
        </div>
    )
}
export default AudioMeter