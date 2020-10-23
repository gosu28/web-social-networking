import React from 'react'

const AuthContext = React.createContext({
  isAuth: false,
  onLogin: null,
  onLogout: null
});
export { AuthContext };