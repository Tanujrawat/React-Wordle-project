import { useEffect, useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({}) // for keyboard Component {a:green, b:yellow, c:grey}

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((l) => {
      return {key: l, color: 'grey'}
    })

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })
    
    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess

    // const charArray = currentGuess.split('')
    // const currStringObject = {}

    // charArray.forEach((char, idx)=>{
    //   const solutionChar = solution[idx]
    //   let color = "";
    //   if(char === solutionChar){
    //     color = "green"
    //   }else if(solution.includes(char)){
    //     color = "yellow"
    //   }else{
    //     color = "grey"
    //   }
    //   currStringObject[char] = color;
    // }) 

    //setGuesses(prevGuesses => [...prevGuesses, currStringObject]);
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if(currentGuess === solution){
      setIsCorrect(true)
    }
    
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })

    setTurn((prevTurn) => {
      return prevTurn+1;
    });
    
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key]

        if(l.color === 'green'){
          newKeys[l.key] = 'green'
          return
        }
        if(l.color === 'yellow' &&  currentColor !== 'green'){
          newKeys[l.key] = 'yellow'
          return;
        }
        if(l.color === 'grey' &&  currentColor !== 'green' && currentColor !== 'yellow'){
          newKeys[l.key] = 'grey'
          return;
        }
      })

      return newKeys;
    })
    setCurrentGuess('')
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({key}) => {
    // console.log(key);
    if(key === 'Enter'){
      // only add guess if turn is less than 5
      if(turn > 5){
        console.log('you used all your chances');
        return
      }

      // do not make duplicate guesses
      if(history.includes(currentGuess)){
        console.log("you have already used this guess");
        return
      }

      //if your guess is not of length 5 then it can't be submitted 
      if(currentGuess.length !== 5){
        console.log("please add more characters")
        return
      }

      const formatted = formatGuess()
      addNewGuess(formatted)
    }
    if(key === 'Backspace'){
      setCurrentGuess((prev)=>{
        return prev.slice(0,-1)
      })
      return
    }
    if(/^[A-Za-z]$/.test(key)){
      if(currentGuess.length < 5){
      setCurrentGuess((prev)=>{
        return prev+key
      })}
    }
  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle