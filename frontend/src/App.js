import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import { useEffect } from "react";
import ResetPassword from "./components/resetpassword";
import Home from "./components/home";
import User from "./components/user";
import CreatePost from "./components/createpost";
import Profile from "./components/profile";
import UserBio from "./components/userbio";
import UpdatePassword from "./components/updatepassword";

/**/

/*<div className="container mt-2">
<GoogleLogin
  clientId={process.env.REACT_APP_CLIENT_ID}
  buttonText="Continue with Google"
  onSuccess={handleLogin}
  onFailure={handleLogin}
  cookiePolicy={"single_host_origin"}
/>*/
/*

*/
const App = () => {
  useEffect(() => {
    document.title = `Social Media`;
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" exact component={LogIn} />
        <Route path="/resetpassword" exact component={ResetPassword} />
        <Route path="/updatepassword" exact component={UpdatePassword} />
        <Route path="/home" exact component={Home} />
        <Route path="/addbio" exact component={UserBio} />
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/" component={SignUp} />
      </Switch>
    </div>
  );
};

export default App;
