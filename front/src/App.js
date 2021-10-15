import './css/App.css';
import MainList from './components/MainList';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import { Component } from 'react';
import SitterList from './components/SitterList';


class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundColor:'#fafafa', minHeight:'1000px'}}>
        <BrowserRouter>
            <Sidebar className = "sidebar"></Sidebar>
            <Switch>
              <Route path = "/" exact component = {MainList}/>
              <Route path = "/sit"  component = {SitterList} />
              <Route path = "/board" component = {Board}/>
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
