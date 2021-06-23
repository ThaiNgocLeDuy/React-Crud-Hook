import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/_common/Navbar";
import AddBookForm from "./components/forms/AddBookForm";
import HomePage from "./components/home/HomePage";


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
