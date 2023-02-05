import React from "react";
import Question from "./component/Question";
import Load from "./component/Load";
import style from "./App.module.css";

export default function App() {
  const [start, setStart] = React.useState(true)
  const [alldata, setAlldata] = React.useState([])
  const [result, setResult] = React.useState(false)
  const [counter, setCounter] = React.useState(0)

  function startQuiz() {
    dataFetch();
    setStart(false);
  }

  // shuffleArray in random order: shuffle all mcq's
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Decode's all the data
  function decode(html) {
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
  }

  // fetch data from the api
  function dataFetch() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const mainData = data.results.map((item) => {
          const question = decode(item.question)
          const answer = {
            id: 0,
            mcq: decode(item.correct_answer),
            isSelected: false,
          };
          const incorrect_answers = item.incorrect_answers.map((x, index) => {
            return {
              id: index + 1,
              mcq: decode(x),
              isSelected: false,
            };
          });
          const options = shuffleArray([answer, ...incorrect_answers])
          return {
            question: question,
            answer: answer,
            options: options,
          };
        });
        setAlldata(mainData)
      });
  }

  // update the state of each options to true
  function handleSelect(id, q) {
    setAlldata((prevAlldata) => {
      const newArr = []
      for (let i = 0; i < prevAlldata.length; i++) {
        const currentData = prevAlldata[i];
        if (currentData.question == q) {
          const newMcq = []
          for (let j = 0; j < currentData.options.length; j++) {
            if (currentData.options[j].id == id) {
              const updatedObj = {
                ...currentData.options[j],
                isSelected: !currentData.options[j].isSelected,
              };
              newMcq.push(updatedObj)
            } else {
              const updatedObj = {
                ...currentData.options[j],
                isSelected: false,
              };
              newMcq.push(updatedObj)
            }
          }
          const updatedObj = {
            ...currentData,
            options: newMcq,
          };
          newArr.push(updatedObj)
        } else {
          const updatedObj = {
            ...currentData,
          };
          newArr.push(updatedObj)
        }
      }
      return newArr
    });
  }

  // shows result
  function toggleResult() {
    const selectedMcq = []
    alldata.map((item) => {
      item.options.map((mcq) => {
        if (mcq.isSelected == true) {
          selectedMcq.push(mcq.mcq)
        }
      });
    });
    for (let i = 0; i < alldata.length; i++) {
      if (selectedMcq.includes(alldata[i].answer.mcq)) {
        setCounter((state) => state + 1);
      }
    }
    setResult(true);
  }

  // replay the game
  function replay() {
    setStart(false)
    setAlldata([])
    dataFetch()
    setResult(false)
    setCounter(0)
  }

  const questionComps = alldata.map((item, index) => {
    return (
      <Question
        id={index}
        handleSelect={handleSelect}
        key={index}
        question={item.question}
        options={item.options}
      />
    );
  });

  return (
    <div>
      {start === false ? (
        <div className={style.container}>
          <div className={style.main}>{questionComps}</div>

          <div className={style.result}>
            {result && <p>You scored {counter}/5 correct answers</p>}
            {result ? (
              <button onClick={replay} className={style.answer}>
                Play again
              </button>
            ) : (
              <button onClick={toggleResult} className={style.answer}>
                Check answer
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={style.load}>
          <Load onClick={startQuiz} />
        </div>
      )}
    </div>
  );
}
