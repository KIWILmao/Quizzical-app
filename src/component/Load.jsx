import React from "react"
import style from './Load.module.css'

export default function Load(props){
    return(
        
        <div className={style.first}>
            <h1>Quizzical</h1>
            <p>Ready for random fun quiz?? 😗🤗</p>
            <button className={style.start}onClick={props.onClick}>Start quiz 💪</button>
        </div>
    )
}