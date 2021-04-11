import React, { useState } from 'react'
const Button = ({handleClick, text}) => {
  return (
      <button onClick={handleClick}>
        {text}
      </button>
  )
}
const Statistic = (props) => {
  return (
      <tr>
        <td>{props.text} </td>
        <td>{props.value}</td>
      </tr>
  )
}
const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>
          <p>No feedback given</p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <div>
        <table>
          <tbody>
            <Statistic text="good" value={props.good}></Statistic>
            <Statistic text="neutral" value={props.neutral}></Statistic>
            <Statistic text="bad" value={props.bad}></Statistic>
            <tr>
              <td>all</td>
              <td>{props.bad + props.neutral + props.good}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{(props.good - props.bad)/(props.good+props.bad+props.neutral)}</td>
            </tr>
            <tr>
              <td>positive </td>
              <td>{100*(props.good)/(props.good+props.bad+props.neutral)} %</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() =>setGood(good+1)} text="good"></Button>
        <Button handleClick={() =>setNeutral(neutral+1)} text="neutral"></Button>
        <Button handleClick={() =>setBad(bad+1)} text="bad"></Button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  )
}

export default App