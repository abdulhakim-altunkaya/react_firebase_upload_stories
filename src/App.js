import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from  "react-router-dom";
import InputForm from "./InputForm";
import List from "./List";

function App() {

  return (

    <div className="App">

      <Router>
        
        <Routes>
          <Route path="/" element={ <InputForm /> } />
          <Route path="/list" element={ <List /> } />
        </Routes>

      </Router>
      
    </div>

  );
}

export default App;
