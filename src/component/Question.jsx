import React from 'react'
import Mcq from './Mcq'
import './Question.css'

export default function Question(props){

    const mcq = props.options.map((item,index) =>{
        return(
          <Mcq
          key={index}
          x={item}
          /> 
        )
      })


    return(
        <div>
            <h4>{props.question}</h4>
            <div className="options">
                {
                    mcq   
                }
            </div>
        </div>
    )
}
