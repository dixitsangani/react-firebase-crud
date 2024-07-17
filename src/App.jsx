import { useState } from 'react'
import './App.css'
import Todo from './page/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Todo/>
   </>
  )
}

export default App
