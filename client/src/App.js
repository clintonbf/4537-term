import React, {useState} from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import { AuthContext } from "./context/auth";

import HomePage from './Pages/HomePage'; 
import BrowseAllResources from './Pages/BrowseAllResources'; 
import BrowseCollection from './Pages/BrowseCollection'; 
import SelectCollection from './Pages/SelectCollection'; 
import AddCollection from './Pages/AddCollection'; 

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
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/browseAll' component={BrowseAllResources} /> 
        <Route path='/selectCollection' component={SelectCollection} /> 
        <Route path='/browseCollection/:id' component={BrowseCollection} /> 
        <Route path='/addCollection' component={AddCollection} /> 
      </Switch>
    </Router>
    </AuthContext.Provider>
    </>
  );
}

export default App;
