import React from 'react'
import './Question.css'

export default function Question(props){
    return(
        <div>
            <h1>{props.question}</h1>
            <div className="options">
                <div>{props.options[0]}</div>
                <div>{props.options[1]}</div>
                <div>{props.options[2]}</div>
                <div>{props.options[3]}</div>
            </div>
        </div>
    )
}
