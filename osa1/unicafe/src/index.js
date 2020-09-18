import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={incrementGood}
        text='good'
      />
      <Button
        handleClick={incrementNeutral}
        text='neutral'
      />
      <Button
        handleClick={incrementBad}
        text='bad'
      />
      <h1>statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
  )

const Statistics = (props) => {
  let all = props.good+props.neutral+props.bad
  let average = (props.good-props.bad)/all
  let positive = props.good/all * 100 + ' %'

  if (all < 1){
    return (
      <div>
        No feedback given.
      </div>
    )
  }
  return (
    <div>
      <table> 
        <tbody>
          <StatisticsLine text='good' value={props.good}/>
          <StatisticsLine text='neutral' value={props.neutral}/>
          <StatisticsLine text='bad' value={props.bad}/>
          <StatisticsLine text='all' value={all}/>
          <StatisticsLine text='average' value={average}/>
          <StatisticsLine text='positive' value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = (props) => {
  return ( 
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}
ReactDOM.render(<App />,
  document.getElementById('root')
)
