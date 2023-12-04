import React from 'react'

export default function row({ guess, currentGuess }) {
  // guess is an array of objects of one of our guess, with key:letter and color:''
  
// below is how  console.log(guess) looks like for each word 
// (5) [{…}, {…}, {…}, {…}, {…}]
// 0
// : 
// {key: 't', color: 'green'}
// 1
// : 
// {key: 's', color: 'grey'}
// 2
// : 
// {key: 'a', color: 'green'}
// 3
// : 
// {key: 'i', color: 'green'}
// 4
// : 
// {key: 'n', color: 'green'}
// length
// : 
// 5
// [[Prototype]]
// : 
// Array(0)
// console.log(currentGuess.slice(currentGuess.length-1, currentGuess.length))
// console.log(guess)

if(guess){
    return(
      <div className="row past">
        {guess.map((l, i)=>(
          <div key={i} className={l.color}>{l.key}</div>  
        ))}
      </div>
    )
  }

  if(currentGuess){
    let letters = currentGuess.split('')

    return(
      <div className="row current">
        {letters.map((letter, i)=>(
          <div key={i} className="filled">{letter}</div>
        ))}
        {[...Array(5-letters.length)].map((_,i) => (
          <div key={i}></div>
        ))}
      </div>
    )
  }
  // above code is equivalent to below code just with map
  return (
    <div className="row">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
