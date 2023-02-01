import React from "react"
import './Question.css'

export default function Mcq(props){

    const [enable ,setEnable] = React.useState(false)

    function handleClick(){
        setEnable(prev=>!prev)
    }
    // console.log(props);
    return(
        <div onClick={handleClick}className={enable ? "select" : ""}>{props.x}</div>
    )
}