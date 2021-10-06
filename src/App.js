import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [users, setUsers] = useState({});

  // Google Sign in
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUsers(user);
      }).catch(error => {
        console.log(error.message);
      })
  }

  // Github Sign in
  const handleGithubSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUsers(user);
      })
  }

  // Sign out
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUsers({})
      })
  }

  return (
    <div className="App">
      <h2>Hello Firebase</h2>
      {
        !users.displayName ? <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div> : <div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      }

      <div className="user-design">
        <img src={users.photoURL} alt="" />
        <h3>{users.displayName}</h3>
        <h4>{users.email}</h4>
      </div>
    </div>
  );
}

export default App;