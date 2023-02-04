import React from 'react'
import './Question.css'

export default function Question(props){



    const mcq = props.options.map((item,index) =>{
        return(
          <div id={index} key={index}onClick={()=>props.handleSelect(props.id)}>{item.mcq}</div>
        )
      })


    return(
        <div>
            <h4>{props.question}</h4>
            <div className='options'>
              {mcq}
            </div>
        </div>
    )
}
