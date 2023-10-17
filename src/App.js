import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'


function App() {
  return (
    <>
    <BrowserRouter>
      <div className='main'>
        <Header/>
        <Routes> 
        <Route path='/' Component={HomePage} exact/>
        <Route path='/coins/:id' Component={CoinPage}/>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
