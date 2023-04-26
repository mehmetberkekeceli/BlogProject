import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Footer from "./components/footer/Footer";
import VisitorCounter from "./components/visitor/VisitorCounter";

function App(): JSX.Element {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Footer />
      <VisitorCounter/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/about">{<About />}</Route>
        <Route path="/post/:blogId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

