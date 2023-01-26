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
        const mainData = data.results.map((item) => {
          const question = decode(item.question)
          const answer = decode(item.correct_answer)
          const incorrect_answers = item.incorrect_answers.map(item => decode(item))
          const options = shuffleArray([answer,...incorrect_answers])
          return{
            question:question,
            answer:answer,
            options:options
          }
        }) 
        setAlldata(mainData)
      })
    },[])

  console.log(alldata)
  
  const questionComps = alldata.map((item,index) => <Question 
    key={index}
    question={item.question}
    options={item.options}
    />)

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