import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './screens/Auth/Login'
import { AuthContext } from "./context";
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout/DefaultLayout'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

function App() {
  let token = getToken();
  const [isAuth, setAuth] = useState(token!=null);
  function onLogin() {
    setAuth(true);
  }

  function onLogout() {
    localStorage.removeItem("token");
    setAuth(false);
  }

  function getToken() {
    let access_token = null;
    var strToken = localStorage.getItem('token');
    
    try {
      var token = JSON.parse(strToken);
      
      if (token && token.token) {
        access_token = token.token;
        
        setAuth(true)
      } else {
        access_token = null;
      }
    } catch (error) {
      access_token = null;
    }

    return access_token;
  }
  return (
    <HashRouter>
      <AuthContext.Provider value={{ isAuth, onLogin, onLogout }}>
        {isAuth ?
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
            </Switch>
          </React.Suspense>
          :
          <Login />}
      </AuthContext.Provider>
    </HashRouter>
      
       
  );
}
export default App;
