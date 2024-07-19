import './App.css';
import {ExpenseTracker} from "./pages/expense-tracker/index"
import {Auth} from "./pages/auth/index"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element ={<Auth/>}/>
          <Route path="/expense-tracker"  element ={<ExpenseTracker/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
