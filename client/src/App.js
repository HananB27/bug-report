import {BrowserRouter, Route, Routes} from 'react-router-dom'
const App = () =>{
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello root</div>}/>
        <Route path="/hello" element={<div>Component 2</div>}/>
      </Routes>
    </BrowserRouter>      
  )
};

export default App;