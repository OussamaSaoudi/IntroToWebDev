import React, { useState } from 'react'
const Button = ({setter, len}) => {
  return (
    <div>
      <button onClick={() => setter(Math.floor(Math.random()*len))}>next anecdote</button>
    </div>
  )
}
const Voter = ({selected, votes, setter}) => {
  let newVotes = [...votes]
  newVotes[selected] = newVotes[selected] + 1
  return (
    <div>
      <button onClick={() => setter(newVotes)}>vote</button>
    </div>
  )
}
const Max = ({anecdotes, votes}) => {
  let index = 0
  let len = anecdotes.length
  for (let i = 0; i < len; i++) {
    if (votes[i] > votes[index]) {
      index = i
    }
  }
  return (
    <div>
      <h1>
      Anecdote with most votes
      </h1>
      <p>{anecdotes[index]}</p>
    </div>

  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  console.log(votes)
  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button setter={setSelected} len={anecdotes.length} ></Button>
      <Voter selected={selected} votes={votes} setter={setVote}></Voter>
      <Max anecdotes={anecdotes} votes={votes}></Max>
    </div>
  )
}

export default App