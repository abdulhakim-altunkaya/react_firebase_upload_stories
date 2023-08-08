import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from  "react-router-dom";
import InputForm from "./InputForm";
import List from "./List";
import Detail from "./Detail";

function App() {

  return (

    <div className="App"> 

      <Router>
        
        <Routes>
          <Route path="/" element={ <List /> } />
          <Route path="/add" element={ <InputForm /> } />
          <Route path="/detail/:firestoreId" element={ <Detail /> } />
        </Routes>

      </Router>
      
    </div>

  );
}

export default App;
