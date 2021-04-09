import React, {useState} from 'react'; 
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'; 
import { AuthContext } from "./context/auth";

import HomePage from './Pages/HomePage'; 
import BrowseAllResources from './Pages/BrowseAllResources'; 
import BrowseCollection from './Pages/BrowseCollection'; 
import BrowseAllCollections from './Pages/BrowseAllCollections'; 
import AddCollection from './Pages/AddCollection'; 
import ViewResource from './Pages/ViewResource';
import Rando from './Pages/Rando'; 

function App() {
  const [authoTokens, setauthoTokens] = useState(localStorage.getItem("tokens") || '')

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  
  const getTokens = () => {
    let tokens = localStorage.getItem("tokens") || '';
    if (tokens) tokens = JSON.parse(tokens);
    return tokens;
  }

  const logout = () => {
    localStorage.setItem("tokens", '');
    setAuthTokens('');
  }

  return (
    <>

  
    <AuthContext.Provider value={{ authTokens: getTokens(), setAuthTokens: setTokens }}>
    <Router>
      
            <div>
    <Link to='/'>
        <button> Home </button>
    </Link>
    </div>  
        
      
      <Switch>
        
    
        
        <Route path='/' exact component={HomePage}/>
        <Route path='/browseAllResources' component={BrowseAllResources} /> 
        <Route path='/viewResource/:id' component={ViewResource} />
        
        <Route path='/browseAllCollections' component={BrowseAllCollections} /> 
        <Route path='/browseCollection/:id' component={BrowseCollection} /> 
        <Route path='/addCollection' component={AddCollection} /> 
        
        <Route path='/random' component={Rando} />
      </Switch>
    </Router>
    </AuthContext.Provider>
    </>
  );
}

export default App;
