import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="text-center">
      <header className="App-header">
        <img src={logo} className="opacity-50 h-96" alt="logo" />
        <p>
          Edit <code className='text-black' >src/App.js</code> and save to reload.
        </p>
        <a
          className="italic"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
