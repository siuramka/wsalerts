import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';

function App() {
  const [count, setCount] = useState(0)
  const [test, setTest] = useState([])

  const fetchUserData = () => {
    fetch("http://localhost:5106/api/voice")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTest(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])
  
  return (
    <>
      <div>
        {
          test.map((item: any) => (
              <div key={item.id}>{item.name}</div>
          ))
        }
      </div>
    </>
  )
}

export default App
