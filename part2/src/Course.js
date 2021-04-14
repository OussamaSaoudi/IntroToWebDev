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
export default Course