  
import React from "react";
import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

//pages 
import HomePage from "./pages/HomePage";
import CreateMemePage from "./pages/CreateMemePage";
import SavedMemePage from "./pages/SavedMemePage";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
      <div>
        <Router basename="/">
          <AuthProvider>
            <Navbar />
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path={["/","/login"]}>
                <Login />
              </Route>
              <Route exact path ="/forgot-password" component={ForgotPassword} />
              <Route exact path="/update-profile" component={UpdateProfile} />
              <PrivateRoute exact path="/homepage" component={HomePage} />
              <PrivateRoute exact path ="/create" component={CreateMemePage} />
              <PrivateRoute exact path="/saved" component={SavedMemePage} />
              <PrivateRoute exact path ="/profile" component={Profile} />
              <PrivateRoute exact path = "/profile/:userid" component={UserProfile} />
            </Switch>
            <Footer />
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;