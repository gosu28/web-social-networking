export const signup = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export const login = user => {
    return fetch(`${process.env.REACT_APP_API_URL}login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
        .then(res =>res.json())
        .catch(err=>console.log(err))
}
export const authenticate = (jwt, next) => {
    if (typeof window != 'undefined') {
        console.log(JSON.stringify(jwt))
        localStorage.setItem('token', JSON.stringify(jwt))
        next();
    }
}

export const isAuthenticate = () => {
    let jwt = localStorage.token;
    if (jwt) return JSON.parse(jwt);
    return false
}

export const logout = next => {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt');
    next();
    return fetch(`${process.env.REACT_APP_API_URL}logout`, { method: 'POST' })
      .then(res => res.json())
      .catch(err => console.log(err));
  };