import React from 'react'

const Part = ({part}) => (
  <li>{part.name} {part.exercises}</li>
)
const Content = ({partList}) => {
  return (
    <div>
      <ul>
        {partList.map(part => 
          <Part part={part} key={part.id}/> 
        )}
      </ul>
      <b>total of {partList.reduce((total,part) => total + part.exercises, 0)} exercises</b>
    </div>
  )
}
const Course = ({course}) => (
  <div>
    <h1>{course.name}</h1>
    <Content partList={course.parts}/>
  </div>
)
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      {courses.map(course => <Course course={course} />)}
    </div>
  )
}

export default App