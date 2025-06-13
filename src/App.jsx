
import './App.css'


const Card=()=>{
  return(
    <div style={{border: '1px solid #ccc', padding: '16px', borderRadius: '8px'}}>
    CardComponent
    </div>
  )
}

const App=()=>{
  return(
    <>
      <h1>React Tutorial</h1>
      <p>Welcome to the React tutorial!</p>
      <p>This is a simple React application.</p>
      <button onClick={() => alert('Button clicked!')}>Click Me</button>
      <Card />
    </>
  )
}


export default App
