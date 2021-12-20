import logo from "./logo.svg";
import "./App.css";
import Simon from "./components/Simon/Simon";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          <img src={logo} className="App-logo" alt="logo" />
          says
        </h1>
      </header>
      <div className="App-intro">
        <Simon/>
      </div>
    </div>
  );
}

export default App;
