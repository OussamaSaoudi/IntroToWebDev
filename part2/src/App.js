import React from 'react'

const Part = ({part}) => (
  <li>{part.name}</li>
)
const Content = ({partList}) => (
  <ul>
    {partList.map(part => 
      <Part part={part} key={part.id}/> 
    )}
  </ul>
)
const Course = ({course}) => (
  <div>
    <h1>{course.name}</h1>
    <Content partList={course.parts}/>
  </div>
)
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App