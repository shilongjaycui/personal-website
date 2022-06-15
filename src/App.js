import './App.css';
import Header from './components/Header';
import cyborg_commando from './images/home/cyborg_commando.png'

function App() {
  return (
    <div>
      <Header />
      <img src={cyborg_commando} alt={'大佬'} className="w-screen"/>
    </div>
  );
}

export default App;
