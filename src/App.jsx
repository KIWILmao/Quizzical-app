import React from 'react'
import Question from './component/Question'
import Load from './component/Load'
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
        const mainData = data.results.map((item,index) => {
          const question = decode(item.question)
          const answer ={
            id:0,
            mcq:decode(item.correct_answer),
            isSelected:false
          }
          const incorrect_answers = item.incorrect_answers.map((x,index) => {
            return{
              id:index+1,
              mcq:decode(x),
              isSelected:false
            }
          })
          const options = [answer,...incorrect_answers]
          return{
            id:index,
            question:question,
            answer:answer,
            options:options
          }
        }) 
        setAlldata(mainData)
      })
    },[])

    
    
    
    
    function handleSelect(id){
      setAlldata(prevAlldata => {
        const newArr = []
        for (let i = 0; i < prevAlldata.length; i++) {
          const currentData = prevAlldata[i]
          if(currentData.id == id){
            const newMcq = []
            for(let j =0; j<currentData.options.length; j++){
              if(currentData.options[j].id == id ){
                const updatedObj = {
                  ...currentData.options[j],
                  isSelected: true
                }
                newMcq.push(updatedObj)
              }
              else{
                const updatedObj = {
                  ...currentData.options[j],
                  isSelected: false
                }
                newMcq.push(updatedObj)
              }
            }
            newArr.push(currentData)
          }
          else{
            newArr.push(currentData)   
          }
        }
        return newArr
      })
    }
    // console.log(alldata)
    console.log(alldata)
    
  const questionComps = alldata.map((item,index) =>{
    return(
      <Question 
      id={index}
      handleSelect={handleSelect}
      key={index}
      question={item.question}
      options={item.options}
      // handleClick={handleClick}
      />
      )
  })


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