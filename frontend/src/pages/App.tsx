import React, {useState, useEffect} from 'react'
import axios from 'axios'
function App() {
  const [data, setData] = useState({
    name: "Someone random",
    age: 0,
    date: "",
    programming:"",
  })

  useEffect(() => {
    axios.post('http://localhost:5000/test-post', data).then((response) => {

      if (response.status === 200) {
        console.log(response.data)
      }
    }, (error) => {
      console.log(error);
    })   
  }, [])
  return (
    <div>
      <button>Click me</button>
    </div>
  )
}

export default App
