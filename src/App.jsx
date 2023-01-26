import React from 'react'
import Question from './Question'
import Load from './Load'
import './App.css'

export default function App() {

  const [start, setStart] = React.useState(true)
  const [alldata, setAlldata] = React.useState([])

  function startQuiz() {
    setStart(false)
  }
  
  // shuffleArray in random order: shuffle all mcq's 
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function decode(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        setAlldata(data.results)
      })
    },[])
    
  const questionComps = alldata.map((item,index) => <Question key={index}question={decode(item.question)}/>)

  return (
    <div>
      {start === false ?
        <div>
          {questionComps}
        </div> :
        <div className='load'>
          <Load onClick={startQuiz} />
        </div>}
    </div>
  )
}


