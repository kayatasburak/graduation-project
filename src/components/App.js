import Navbar from "./Navbar";
import Users from './Users'
import React, {Fragment, useState} from "react";
import axios from 'axios'
import Search from './Search'
import Alert from './Alert'
import {signInWithGoogle} from "./Firebase";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || ''
  });

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);

  const searchUsers = (keyword) => {
    setLoading(true);

    setTimeout(() => {
      axios
        .get(`https://api.github.com/search/users?q=${keyword}`)
        .then(res => {
          setUsers(res.data.items);
          setLoading(false);
        });
    }, 1000);
  }

  const clearUsers = () => {
    setUsers([]);
  }

  return (
    <div className="App">
      <button class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      {userData.name && userData.email &&
        <Fragment>
          <h1>{userData.name}</h1>
          <h1>{userData.email}</h1>
        </Fragment>
      }
      <Fragment>
        <Navbar/>
        <Alert alert={alert}/>
        <Search
          searchUsers={searchUsers}
          clearUsers={clearUsers}
          showClearButton={users.length > 0}
          setAlert={setAlert}/>
        <Users users={users} loading={loading}/>
      </Fragment>
    </div>
  );
}

export default App;
