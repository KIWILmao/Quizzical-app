import React from "react"
import './Load.css'

export default function Load(props){
    return(
        <div className="first">
            <h1>Quizzical</h1>
            <p>Ready for random fun quiz?? 😗🤗</p>
            <button onClick={props.onClick}>Start quiz 💪</button>
        </div>
    )
}